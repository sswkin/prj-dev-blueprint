export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  completed: boolean;
  skippable: boolean;
}

export interface OrganizationData {
  name: string;
  industry: string;
  employeeCount: string;
  logo?: File | null;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
}

export interface TeamData {
  name: string;
  purpose: string;
  description: string;
  teamLead: string;
  members: TeamMember[];
  permissions: TeamPermissions;
}

export interface TeamMember {
  id: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'pending' | 'invited' | 'active';
}

export interface TeamPermissions {
  canCreateProjects: boolean;
  canInviteMembers: boolean;
  canManageWorkspaces: boolean;
  canViewAnalytics: boolean;
}

export interface WorkspaceData {
  name: string;
  type: 'development' | 'marketing' | 'design' | 'sales' | 'hr' | 'other';
  description: string;
  accessLevel: 'public' | 'team' | 'private';
  resourceAllocation: {
    storage: string;
    bandwidth: string;
    users: string;
  };
  integrations: string[];
}

export interface ProjectData {
  name: string;
  description: string;
  objectives: string[];
  startDate: string;
  endDate: string;
  milestones: Milestone[];
  assignedMembers: string[];
  initialTasks: Task[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export interface OnboardingData {
  organization: OrganizationData;
  team: TeamData;
  workspace: WorkspaceData;
  project: ProjectData;
}