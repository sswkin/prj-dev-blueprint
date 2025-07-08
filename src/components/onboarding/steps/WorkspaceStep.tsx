import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Lock, Users, Globe, HardDrive, Wifi, UserCheck, Plug } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';

import type { WorkspaceData, TeamData } from '@/types/onboarding';

interface WorkspaceStepProps {
  data?: WorkspaceData;
  teamData?: TeamData;
  onUpdate: (data: WorkspaceData) => void;
  onNext: () => void;
}

const workspaceTypes = [
  { value: 'development', label: 'Development', description: 'Code repositories, CI/CD, testing' },
  { value: 'design', label: 'Design', description: 'Design files, prototypes, assets' },
  { value: 'marketing', label: 'Marketing', description: 'Campaigns, content, analytics' },
  { value: 'sales', label: 'Sales', description: 'CRM, leads, proposals' },
  { value: 'hr', label: 'Human Resources', description: 'Recruitment, onboarding, policies' },
  { value: 'other', label: 'Other', description: 'Custom workspace type' }
];

const integrations = [
  { id: 'github', name: 'GitHub', description: 'Code repositories and version control' },
  { id: 'slack', name: 'Slack', description: 'Team communication and notifications' },
  { id: 'jira', name: 'Jira', description: 'Project management and issue tracking' },
  { id: 'figma', name: 'Figma', description: 'Design collaboration and prototyping' },
  { id: 'google-drive', name: 'Google Drive', description: 'File storage and sharing' },
  { id: 'trello', name: 'Trello', description: 'Task management and organization' },
  { id: 'zoom', name: 'Zoom', description: 'Video conferencing and meetings' },
  { id: 'notion', name: 'Notion', description: 'Documentation and knowledge base' }
];

export const WorkspaceStep: React.FC<WorkspaceStepProps> = ({
  data,
  teamData,
  onUpdate,
  onNext
}) => {
  const [formData, setFormData] = useState<WorkspaceData>({
    name: data?.name || `${teamData?.name || 'Main'} Workspace`,
    type: data?.type || 'development',
    description: data?.description || '',
    accessLevel: data?.accessLevel || 'team',
    resourceAllocation: data?.resourceAllocation || {
      storage: '10GB',
      bandwidth: '100GB',
      users: '25'
    },
    integrations: data?.integrations || []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof WorkspaceData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleResourceChange = (resource: keyof WorkspaceData['resourceAllocation'], value: string) => {
    setFormData(prev => ({
      ...prev,
      resourceAllocation: {
        ...prev.resourceAllocation,
        [resource]: value
      }
    }));
  };

  const handleIntegrationToggle = (integrationId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      integrations: checked
        ? [...prev.integrations, integrationId]
        : prev.integrations.filter(id => id !== integrationId)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Workspace name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Please select a workspace type';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            Workspace Creation
          </CardTitle>
          <CardDescription>
            Set up your collaborative workspace where your team will work together on projects.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Workspace Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Workspace Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workspaceName">Workspace Name *</Label>
                <Input
                  id="workspaceName"
                  placeholder="Enter workspace name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="workspaceType">Workspace Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select workspace type" />
                  </SelectTrigger>
                  <SelectContent>
                    {workspaceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workspaceDescription">Description (Optional)</Label>
              <Textarea
                id="workspaceDescription"
                placeholder="Describe the purpose and goals of this workspace..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Access Level Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Access Level Settings
            </h3>
            
            <RadioGroup
              value={formData.accessLevel}
              onValueChange={(value) => handleInputChange('accessLevel', value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="public" id="public" />
                <div className="flex items-center gap-2 flex-1">
                  <Globe className="h-4 w-4 text-green-600" />
                  <div>
                    <Label htmlFor="public" className="font-medium">Public</Label>
                    <p className="text-sm text-muted-foreground">Anyone in the organization can access</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="team" id="team" />
                <div className="flex items-center gap-2 flex-1">
                  <Users className="h-4 w-4 text-blue-600" />
                  <div>
                    <Label htmlFor="team" className="font-medium">Team Only</Label>
                    <p className="text-sm text-muted-foreground">Only team members can access</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="private" id="private" />
                <div className="flex items-center gap-2 flex-1">
                  <Lock className="h-4 w-4 text-red-600" />
                  <div>
                    <Label htmlFor="private" className="font-medium">Private</Label>
                    <p className="text-sm text-muted-foreground">Invite-only access</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Resource Allocation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Resource Allocation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storage" className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  Storage Limit
                </Label>
                <Select
                  value={formData.resourceAllocation.storage}
                  onValueChange={(value) => handleResourceChange('storage', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5GB">5 GB</SelectItem>
                    <SelectItem value="10GB">10 GB</SelectItem>
                    <SelectItem value="25GB">25 GB</SelectItem>
                    <SelectItem value="50GB">50 GB</SelectItem>
                    <SelectItem value="100GB">100 GB</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bandwidth" className="flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  Bandwidth Limit
                </Label>
                <Select
                  value={formData.resourceAllocation.bandwidth}
                  onValueChange={(value) => handleResourceChange('bandwidth', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50GB">50 GB/month</SelectItem>
                    <SelectItem value="100GB">100 GB/month</SelectItem>
                    <SelectItem value="250GB">250 GB/month</SelectItem>
                    <SelectItem value="500GB">500 GB/month</SelectItem>
                    <SelectItem value="1TB">1 TB/month</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="users" className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  User Limit
                </Label>
                <Select
                  value={formData.resourceAllocation.users}
                  onValueChange={(value) => handleResourceChange('users', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 users</SelectItem>
                    <SelectItem value="25">25 users</SelectItem>
                    <SelectItem value="50">50 users</SelectItem>
                    <SelectItem value="100">100 users</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Integration Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Plug className="h-5 w-5" />
              Integration Preferences
            </h3>
            
            <p className="text-sm text-muted-foreground">
              Select the tools and services you'd like to integrate with your workspace.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {integrations.map((integration) => (
                <div key={integration.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={integration.id}
                    checked={formData.integrations.includes(integration.id)}
                    onCheckedChange={(checked) => handleIntegrationToggle(integration.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={integration.id} className="font-medium cursor-pointer">
                      {integration.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Information Alert */}
          <Alert>
            <FolderOpen className="h-4 w-4" />
            <AlertDescription>
              Your workspace settings can be modified later. Integrations will be configured after the initial setup is complete.
            </AlertDescription>
          </Alert>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit} size="lg">
              Continue to Project Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};