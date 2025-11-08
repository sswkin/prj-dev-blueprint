import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, X, Mail, Shield, UserPlus, HelpCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';

import type { TeamData, TeamMember, OrganizationData } from '@/types/onboarding';

interface TeamStepProps {
  data?: TeamData;
  organizationData?: OrganizationData;
  onUpdate: (data: TeamData) => void;
  onNext: () => void;
}

export const TeamStep: React.FC<TeamStepProps> = ({
  data,
  organizationData,
  onUpdate,
  onNext
}) => {
  const [formData, setFormData] = useState<TeamData>({
    name: data?.name || '',
    purpose: data?.purpose || '',
    description: data?.description || '',
    teamLead: data?.teamLead || organizationData?.contactEmail || '',
    members: data?.members || [],
    permissions: data?.permissions || {
      canCreateProjects: true,
      canInviteMembers: false,
      canManageWorkspaces: false,
      canViewAnalytics: false
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const handleInputChange = (field: keyof TeamData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePermissionChange = (permission: keyof TeamData['permissions'], checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked
      }
    }));
  };

  const addMember = () => {
    if (!newMemberEmail.trim()) return;
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMemberEmail)) {
      setErrors(prev => ({ ...prev, newMember: 'Please enter a valid email address' }));
      return;
    }

    if (formData.members.some(member => member.email === newMemberEmail)) {
      setErrors(prev => ({ ...prev, newMember: 'This email is already added' }));
      return;
    }

    if (formData.members.length >= 5) {
      setErrors(prev => ({ ...prev, newMember: 'Maximum 5 members can be invited during setup' }));
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      email: newMemberEmail,
      role: 'member',
      status: 'pending'
    };

    setFormData(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));

    setNewMemberEmail('');
    if (errors.newMember) {
      setErrors(prev => ({ ...prev, newMember: '' }));
    }
  };

  const removeMember = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== memberId)
    }));
  };

  const updateMemberRole = (memberId: string, role: TeamMember['role']) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map(member =>
        member.id === memberId ? { ...member, role } : member
      )
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Team name is required';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Team purpose is required';
    }

    if (!formData.teamLead.trim()) {
      newErrors.teamLead = 'Team lead is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.teamLead)) {
      newErrors.teamLead = 'Please enter a valid email address';
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
            <Users className="h-5 w-5 text-primary" />
            Team Configuration
          </CardTitle>
          <CardDescription>
            Create your first team and invite members to start collaborating.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Team Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Team Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name *</Label>
                <Input
                  id="teamName"
                  placeholder="e.g., Development Team, Marketing Team"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamPurpose">Team Purpose *</Label>
                <Select
                  value={formData.purpose}
                  onValueChange={(value) => handleInputChange('purpose', value)}
                >
                  <SelectTrigger className={errors.purpose ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select team purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Software Development</SelectItem>
                    <SelectItem value="design">Design & UX</SelectItem>
                    <SelectItem value="marketing">Marketing & Growth</SelectItem>
                    <SelectItem value="sales">Sales & Business Development</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="operations">Operations & Admin</SelectItem>
                    <SelectItem value="research">Research & Development</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.purpose && (
                  <p className="text-sm text-red-500">{errors.purpose}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamDescription">Team Description (Optional)</Label>
              <Textarea
                id="teamDescription"
                placeholder="Describe what this team does and its responsibilities..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Team Lead */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Team Lead Assignment
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="teamLead" className="flex items-center gap-2">
                Team Lead Email *
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The team lead will have administrative permissions for this team</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="teamLead"
                type="email"
                placeholder="Enter team lead email"
                value={formData.teamLead}
                onChange={(e) => handleInputChange('teamLead', e.target.value)}
                className={errors.teamLead ? 'border-red-500' : ''}
              />
              {errors.teamLead && (
                <p className="text-sm text-red-500">{errors.teamLead}</p>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Team Member Invitations
            </h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter member email address"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addMember()}
                  className={errors.newMember ? 'border-red-500' : ''}
                />
                <Button onClick={addMember} disabled={formData.members.length >= 5}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              {errors.newMember && (
                <p className="text-sm text-red-500">{errors.newMember}</p>
              )}
              
              <p className="text-sm text-muted-foreground">
                You can invite up to 5 team members during initial setup. More members can be added later.
              </p>
            </div>

            {formData.members.length > 0 && (
              <div className="space-y-2">
                <Label>Invited Members ({formData.members.length}/5)</Label>
                <div className="space-y-2">
                  {formData.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{member.email}</span>
                        <Badge variant="outline">{member.status}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Select
                          value={member.role}
                          onValueChange={(role: TeamMember['role']) => updateMemberRole(member.id, role)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMember(member.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Team Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Team Permissions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canCreateProjects"
                  checked={formData.permissions.canCreateProjects}
                  onCheckedChange={(checked) => handlePermissionChange('canCreateProjects', checked as boolean)}
                />
                <Label htmlFor="canCreateProjects">Can create projects</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canInviteMembers"
                  checked={formData.permissions.canInviteMembers}
                  onCheckedChange={(checked) => handlePermissionChange('canInviteMembers', checked as boolean)}
                />
                <Label htmlFor="canInviteMembers">Can invite new members</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canManageWorkspaces"
                  checked={formData.permissions.canManageWorkspaces}
                  onCheckedChange={(checked) => handlePermissionChange('canManageWorkspaces', checked as boolean)}
                />
                <Label htmlFor="canManageWorkspaces">Can manage workspaces</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canViewAnalytics"
                  checked={formData.permissions.canViewAnalytics}
                  onCheckedChange={(checked) => handlePermissionChange('canViewAnalytics', checked as boolean)}
                />
                <Label htmlFor="canViewAnalytics">Can view analytics</Label>
              </div>
            </div>
          </div>

          {/* Information Alert */}
          <Alert>
            <Users className="h-4 w-4" />
            <AlertDescription>
              Team members will receive email invitations and can join once they accept. You can modify team settings and permissions anytime.
            </AlertDescription>
          </Alert>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit} size="lg">
              Continue to Workspace Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};