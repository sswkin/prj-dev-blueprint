import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, X, Calendar, Flag, Users, CheckSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

import type { ProjectData, Milestone, Task, WorkspaceData, TeamData } from '@/types/onboarding';

interface ProjectStepProps {
  data?: ProjectData;
  workspaceData?: WorkspaceData;
  teamData?: TeamData;
  onUpdate: (data: ProjectData) => void;
  onNext: () => void;
}

export const ProjectStep: React.FC<ProjectStepProps> = ({
  data,
  workspaceData,
  teamData,
  onUpdate,
  onNext
}) => {
  const [formData, setFormData] = useState<ProjectData>({
    name: data?.name || '',
    description: data?.description || '',
    objectives: data?.objectives || [],
    startDate: data?.startDate || new Date().toISOString().split('T')[0],
    endDate: data?.endDate || '',
    milestones: data?.milestones || [],
    assignedMembers: data?.assignedMembers || [],
    initialTasks: data?.initialTasks || []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newObjective, setNewObjective] = useState('');
  const [newMilestone, setNewMilestone] = useState({ title: '', description: '', dueDate: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', assignee: '', priority: 'medium' as const, dueDate: '' });

  const handleInputChange = (field: keyof ProjectData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addObjective = () => {
    if (!newObjective.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, newObjective.trim()]
    }));
    setNewObjective('');
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const addMilestone = () => {
    if (!newMilestone.title.trim() || !newMilestone.dueDate) return;
    
    const milestone: Milestone = {
      id: Date.now().toString(),
      title: newMilestone.title,
      description: newMilestone.description,
      dueDate: newMilestone.dueDate,
      completed: false
    };

    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, milestone]
    }));
    
    setNewMilestone({ title: '', description: '', dueDate: '' });
  };

  const removeMilestone = (milestoneId: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== milestoneId)
    }));
  };

  const addTask = () => {
    if (!newTask.title.trim() || !newTask.assignee || !newTask.dueDate) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignee: newTask.assignee,
      priority: newTask.priority,
      dueDate: newTask.dueDate
    };

    setFormData(prev => ({
      ...prev,
      initialTasks: [...prev.initialTasks, task]
    }));
    
    setNewTask({ title: '', description: '', assignee: '', priority: 'medium', dueDate: '' });
  };

  const removeTask = (taskId: string) => {
    setFormData(prev => ({
      ...prev,
      initialTasks: prev.initialTasks.filter(t => t.id !== taskId)
    }));
  };

  const toggleMemberAssignment = (memberEmail: string) => {
    setFormData(prev => ({
      ...prev,
      assignedMembers: prev.assignedMembers.includes(memberEmail)
        ? prev.assignedMembers.filter(email => email !== memberEmail)
        : [...prev.assignedMembers, memberEmail]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Project end date is required';
    } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (formData.objectives.length === 0) {
      newErrors.objectives = 'At least one objective is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onUpdate(formData);
      onNext();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const availableMembers = [
    ...(teamData?.teamLead ? [teamData.teamLead] : []),
    ...(teamData?.members?.map(m => m.email) || [])
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Project Initialization
          </CardTitle>
          <CardDescription>
            Create your first project and define its objectives, timeline, and initial tasks.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  placeholder="Enter project name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="workspace">Workspace</Label>
                <Input
                  id="workspace"
                  value={workspaceData?.name || 'Default Workspace'}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description *</Label>
              <Textarea
                id="projectDescription"
                placeholder="Describe the project goals, scope, and expected outcomes..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Project Objectives */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Project Objectives
            </h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a project objective"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addObjective()}
                />
                <Button onClick={addObjective}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              {errors.objectives && (
                <p className="text-sm text-red-500">{errors.objectives}</p>
              )}
              
              {formData.objectives.length > 0 && (
                <div className="space-y-2">
                  {formData.objectives.map((objective, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <span>{objective}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeObjective(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline & Deadlines
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className={errors.endDate ? 'border-red-500' : ''}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Key Milestones */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Milestones</h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <Input
                  placeholder="Milestone title"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  placeholder="Description"
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  type="date"
                  value={newMilestone.dueDate}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
                />
                <Button onClick={addMilestone}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              {formData.milestones.length > 0 && (
                <div className="space-y-2">
                  {formData.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{milestone.title}</div>
                        {milestone.description && (
                          <div className="text-sm text-muted-foreground">{milestone.description}</div>
                        )}
                        <div className="text-sm text-muted-foreground">
                          Due: {new Date(milestone.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMilestone(milestone.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Team Member Assignments */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Member Assignments
            </h3>
            
            {availableMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableMembers.map((memberEmail) => (
                  <div
                    key={memberEmail}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.assignedMembers.includes(memberEmail)
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => toggleMemberAssignment(memberEmail)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border-2 ${
                        formData.assignedMembers.includes(memberEmail)
                          ? 'bg-primary border-primary'
                          : 'border-muted-foreground'
                      }`}>
                        {formData.assignedMembers.includes(memberEmail) && (
                          <CheckSquare className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="font-medium">{memberEmail}</span>
                    </div>
                    {memberEmail === teamData?.teamLead && (
                      <Badge variant="outline">Team Lead</Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No team members available for assignment.</p>
            )}
          </div>

          {/* Initial Task Creation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Initial Task Creation
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                <Input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                />
                <Select
                  value={newTask.assignee}
                  onValueChange={(value) => setNewTask(prev => ({ ...prev, assignee: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMembers.map((email) => (
                      <SelectItem key={email} value={email}>
                        {email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                />
                <Button onClick={addTask}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.initialTasks.length > 0 && (
                <div className="space-y-2">
                  {formData.initialTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{task.title}</span>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        {task.description && (
                          <div className="text-sm text-muted-foreground">{task.description}</div>
                        )}
                        <div className="text-sm text-muted-foreground">
                          Assigned to: {task.assignee} • Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTask(task.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Information Alert */}
          <Alert>
            <Target className="h-4 w-4" />
            <AlertDescription>
              Your project will be created in the {workspaceData?.name} workspace. You can add more tasks, milestones, and team members after the initial setup.
            </AlertDescription>
          </Alert>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit} size="lg">
              Complete Project Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};