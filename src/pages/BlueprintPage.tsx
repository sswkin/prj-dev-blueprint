import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Users, 
  Settings, 
  Monitor, 
  Database, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Download,
  Save,
  Plus,
  Trash2,
  ChevronRight,
  ChevronDown,
  Lightbulb,
  Target,
  Code,
  Palette,
  BarChart,
  Zap,
  Lock
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface UserStory {
  id: string;
  role: string;
  action: string;
  benefit: string;
  priority: 'high' | 'medium' | 'low';
}

interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface BlueprintData {
  // Project Overview
  projectName: string;
  description: string;
  businessObjectives: string[];
  targetUsers: string[];
  timeline: string;
  budget: string;
  
  // Functional Requirements
  coreFeatures: Requirement[];
  userStories: UserStory[];
  inputOutput: string;
  businessRules: string;
  
  // Technical Requirements
  platforms: string[];
  techStack: string[];
  performanceReqs: {
    speed: string;
    loadCapacity: string;
    uptime: string;
  };
  securityReqs: string[];
  integrations: string[];
  
  // UI Requirements
  keyScreens: string[];
  designGuidelines: string;
  accessibility: string[];
  responsive: boolean;
  
  // Data Requirements
  dataTypes: string[];
  storage: string;
  privacy: string[];
  reporting: string[];
  
  // Non-Functional Requirements
  performance: string;
  reliability: string;
  scalability: string;
  maintenance: string;
  
  // Constraints and Dependencies
  limitations: string[];
  dependencies: string[];
  regulations: string[];
  constraints: string;
}

export default function BlueprintPage() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<BlueprintData>({
    projectName: '',
    description: '',
    businessObjectives: [''],
    targetUsers: [''],
    timeline: '',
    budget: '',
    coreFeatures: [{ id: '1', title: '', description: '', priority: 'medium' }],
    userStories: [{ id: '1', role: '', action: '', benefit: '', priority: 'medium' }],
    inputOutput: '',
    businessRules: '',
    platforms: [],
    techStack: [],
    performanceReqs: { speed: '', loadCapacity: '', uptime: '' },
    securityReqs: [],
    integrations: [''],
    keyScreens: [''],
    designGuidelines: '',
    accessibility: [],
    responsive: true,
    dataTypes: [''],
    storage: '',
    privacy: [],
    reporting: [''],
    performance: '',
    reliability: '',
    scalability: '',
    maintenance: '',
    limitations: [''],
    dependencies: [''],
    regulations: [''],
    constraints: ''
  });

  const sections = [
    { id: 0, title: 'Project Overview', icon: Lightbulb, color: 'text-yellow-500' },
    { id: 1, title: 'Functional Requirements', icon: Target, color: 'text-blue-500' },
    { id: 2, title: 'Technical Requirements', icon: Code, color: 'text-green-500' },
    { id: 3, title: 'User Interface', icon: Palette, color: 'text-purple-500' },
    { id: 4, title: 'Data Requirements', icon: Database, color: 'text-orange-500' },
    { id: 5, title: 'Non-Functional', icon: Zap, color: 'text-red-500' },
    { id: 6, title: 'Constraints & Dependencies', icon: Lock, color: 'text-gray-500' }
  ];

  const completionPercentage = () => {
    let completed = 0;
    let total = 0;

    // Count required fields
    if (blueprint.projectName) completed++;
    total++;
    if (blueprint.description) completed++;
    total++;
    if (blueprint.businessObjectives.some(obj => obj.trim())) completed++;
    total++;
    if (blueprint.targetUsers.some(user => user.trim())) completed++;
    total++;
    
    if (blueprint.coreFeatures.some(feature => feature.title.trim())) completed++;
    total++;
    if (blueprint.userStories.some(story => story.role.trim())) completed++;
    total++;
    
    if (blueprint.platforms.length > 0) completed++;
    total++;
    if (blueprint.techStack.length > 0) completed++;
    total++;
    
    if (blueprint.keyScreens.some(screen => screen.trim())) completed++;
    total++;
    
    if (blueprint.dataTypes.some(type => type.trim())) completed++;
    total++;

    return Math.round((completed / total) * 100);
  };

  const addArrayItem = (field: keyof BlueprintData, defaultValue: any) => {
    setBlueprint(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), defaultValue]
    }));
  };

  const removeArrayItem = (field: keyof BlueprintData, index: number) => {
    setBlueprint(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: keyof BlueprintData, index: number, value: any) => {
    setBlueprint(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).map((item, i) => i === index ? value : item)
    }));
  };

  const generateBlueprint = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success('Blueprint generated successfully!');
      // Here you would typically send the data to your AI service
    } catch (error) {
      toast.error('Failed to generate blueprint');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportBlueprint = () => {
    const dataStr = JSON.stringify(blueprint, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${blueprint.projectName || 'blueprint'}-requirements.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Blueprint exported successfully!');
  };

  const renderProjectOverview = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name *</Label>
        <Input
          id="projectName"
          placeholder="Enter your project name"
          value={blueprint.projectName}
          onChange={(e) => setBlueprint(prev => ({ ...prev, projectName: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description *</Label>
        <Textarea
          id="description"
          placeholder="Provide a brief description of your project"
          rows={4}
          value={blueprint.description}
          onChange={(e) => setBlueprint(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label>Business Objectives *</Label>
        {blueprint.businessObjectives.map((objective, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Enter business objective"
              value={objective}
              onChange={(e) => updateArrayItem('businessObjectives', index, e.target.value)}
            />
            {blueprint.businessObjectives.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('businessObjectives', index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('businessObjectives', '')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Objective
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Target Users/Stakeholders *</Label>
        {blueprint.targetUsers.map((user, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Enter target user or stakeholder"
              value={user}
              onChange={(e) => updateArrayItem('targetUsers', index, e.target.value)}
            />
            {blueprint.targetUsers.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('targetUsers', index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('targetUsers', '')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User Type
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="timeline">Project Timeline</Label>
          <Select value={blueprint.timeline} onValueChange={(value) => setBlueprint(prev => ({ ...prev, timeline: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3 months">1-3 months</SelectItem>
              <SelectItem value="3-6 months">3-6 months</SelectItem>
              <SelectItem value="6-12 months">6-12 months</SelectItem>
              <SelectItem value="12+ months">12+ months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range</Label>
          <Select value={blueprint.budget} onValueChange={(value) => setBlueprint(prev => ({ ...prev, budget: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="< $10k">Less than $10,000</SelectItem>
              <SelectItem value="$10k - $50k">$10,000 - $50,000</SelectItem>
              <SelectItem value="$50k - $100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="$100k+">$100,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderFunctionalRequirements = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Core Features and Functionalities *</Label>
        {blueprint.coreFeatures.map((feature, index) => (
          <Card key={feature.id} className="p-4">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Feature title"
                  value={feature.title}
                  onChange={(e) => updateArrayItem('coreFeatures', index, { ...feature, title: e.target.value })}
                />
                <Select
                  value={feature.priority}
                  onValueChange={(value) => updateArrayItem('coreFeatures', index, { ...feature, priority: value })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                {blueprint.coreFeatures.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayItem('coreFeatures', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Textarea
                placeholder="Describe this feature in detail"
                value={feature.description}
                onChange={(e) => updateArrayItem('coreFeatures', index, { ...feature, description: e.target.value })}
                rows={2}
              />
            </div>
          </Card>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('coreFeatures', { 
            id: Date.now().toString(), 
            title: '', 
            description: '', 
            priority: 'medium' 
          })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      <div className="space-y-4">
        <Label>User Stories *</Label>
        <p className="text-sm text-muted-foreground">
          Format: "As a [user], I want to [action] so that [benefit]"
        </p>
        {blueprint.userStories.map((story, index) => (
          <Card key={story.id} className="p-4">
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input
                  placeholder="User role (e.g., customer, admin)"
                  value={story.role}
                  onChange={(e) => updateArrayItem('userStories', index, { ...story, role: e.target.value })}
                />
                <Input
                  placeholder="Action/Goal"
                  value={story.action}
                  onChange={(e) => updateArrayItem('userStories', index, { ...story, action: e.target.value })}
                />
                <Input
                  placeholder="Benefit/Value"
                  value={story.benefit}
                  onChange={(e) => updateArrayItem('userStories', index, { ...story, benefit: e.target.value })}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  As a <strong>{story.role || '[user]'}</strong>, I want to <strong>{story.action || '[action]'}</strong> so that <strong>{story.benefit || '[benefit]'}</strong>
                </div>
                <div className="flex gap-2">
                  <Select
                    value={story.priority}
                    onValueChange={(value) => updateArrayItem('userStories', index, { ...story, priority: value })}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  {blueprint.userStories.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem('userStories', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('userStories', { 
            id: Date.now().toString(), 
            role: '', 
            action: '', 
            benefit: '', 
            priority: 'medium' 
          })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User Story
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="inputOutput">Input/Output Requirements</Label>
        <Textarea
          id="inputOutput"
          placeholder="Describe what data/inputs the system will receive and what outputs it will produce"
          rows={3}
          value={blueprint.inputOutput}
          onChange={(e) => setBlueprint(prev => ({ ...prev, inputOutput: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessRules">Business Rules and Logic</Label>
        <Textarea
          id="businessRules"
          placeholder="Define key business rules, validation logic, and system behaviors"
          rows={3}
          value={blueprint.businessRules}
          onChange={(e) => setBlueprint(prev => ({ ...prev, businessRules: e.target.value }))}
        />
      </div>
    </div>
  );

  const renderTechnicalRequirements = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Target Platforms/Devices *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Web Browser', 'iOS', 'Android', 'Desktop (Windows)', 'Desktop (macOS)', 'Desktop (Linux)'].map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={platform}
                checked={blueprint.platforms.includes(platform)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setBlueprint(prev => ({ ...prev, platforms: [...prev.platforms, platform] }));
                  } else {
                    setBlueprint(prev => ({ ...prev, platforms: prev.platforms.filter(p => p !== platform) }));
                  }
                }}
              />
              <Label htmlFor={platform} className="text-sm">{platform}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Technology Stack Preferences *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', '.NET', 'PHP', 'Ruby', 'Go', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'Azure', 'Google Cloud'].map((tech) => (
            <div key={tech} className="flex items-center space-x-2">
              <Checkbox
                id={tech}
                checked={blueprint.techStack.includes(tech)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setBlueprint(prev => ({ ...prev, techStack: [...prev.techStack, tech] }));
                  } else {
                    setBlueprint(prev => ({ ...prev, techStack: prev.techStack.filter(t => t !== tech) }));
                  }
                }}
              />
              <Label htmlFor={tech} className="text-sm">{tech}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Performance Requirements</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="speed">Response Time</Label>
            <Select 
              value={blueprint.performanceReqs.speed} 
              onValueChange={(value) => setBlueprint(prev => ({ 
                ...prev, 
                performanceReqs: { ...prev.performanceReqs, speed: value } 
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select speed requirement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="< 100ms">Less than 100ms</SelectItem>
                <SelectItem value="< 500ms">Less than 500ms</SelectItem>
                <SelectItem value="< 1s">Less than 1 second</SelectItem>
                <SelectItem value="< 3s">Less than 3 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="loadCapacity">Concurrent Users</Label>
            <Select 
              value={blueprint.performanceReqs.loadCapacity} 
              onValueChange={(value) => setBlueprint(prev => ({ 
                ...prev, 
                performanceReqs: { ...prev.performanceReqs, loadCapacity: value } 
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select load capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="< 100">Less than 100</SelectItem>
                <SelectItem value="100-1k">100 - 1,000</SelectItem>
                <SelectItem value="1k-10k">1,000 - 10,000</SelectItem>
                <SelectItem value="10k+">10,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="uptime">Uptime Requirement</Label>
            <Select 
              value={blueprint.performanceReqs.uptime} 
              onValueChange={(value) => setBlueprint(prev => ({ 
                ...prev, 
                performanceReqs: { ...prev.performanceReqs, uptime: value } 
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select uptime" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="99%">99% (3.65 days downtime/year)</SelectItem>
                <SelectItem value="99.9%">99.9% (8.77 hours downtime/year)</SelectItem>
                <SelectItem value="99.99%">99.99% (52.6 minutes downtime/year)</SelectItem>
                <SelectItem value="99.999%">99.999% (5.26 minutes downtime/year)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Security Requirements</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {['User Authentication', 'Data Encryption', 'HTTPS/SSL', 'Role-based Access', 'Two-factor Authentication', 'Data Backup', 'Audit Logging', 'GDPR Compliance', 'SOC 2 Compliance', 'PCI DSS Compliance'].map((security) => (
            <div key={security} className="flex items-center space-x-2">
              <Checkbox
                id={security}
                checked={blueprint.securityReqs.includes(security)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setBlueprint(prev => ({ ...prev, securityReqs: [...prev.securityReqs, security] }));
                  } else {
                    setBlueprint(prev => ({ ...prev, securityReqs: prev.securityReqs.filter(s => s !== security) }));
                  }
                }}
              />
              <Label htmlFor={security} className="text-sm">{security}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>External System Integrations</Label>
        {blueprint.integrations.map((integration, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Enter external system or API (e.g., Stripe, SendGrid, Google Maps)"
              value={integration}
              onChange={(e) => updateArrayItem('integrations', index, e.target.value)}
            />
            {blueprint.integrations.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('integrations', index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('integrations', '')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>
    </div>
  );

  const renderUIRequirements = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Key Screens/Pages *</Label>
        {blueprint.keyScreens.map((screen, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Enter screen/page name (e.g., Login, Dashboard, Profile)"
              value={screen}
              onChange={(e) => updateArrayItem('keyScreens', index, e.target.value)}
            />
            {blueprint.keyScreens.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('keyScreens', index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('keyScreens', '')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Screen
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="designGuidelines">Design Guidelines/Brand Requirements</Label>
        <Textarea
          id="designGuidelines"
          placeholder="Describe your design preferences, brand colors, style guidelines, etc."
          rows={3}
          value={blueprint.designGuidelines}
          onChange={(e) => setBlueprint(prev => ({ ...prev, designGuidelines: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label>Accessibility Requirements</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {['WCAG 2.1 AA Compliance', 'Screen Reader Support', 'Keyboard Navigation', 'High Contrast Mode', 'Font Size Adjustment', 'Color Blind Friendly', 'Mobile Accessibility', 'Voice Control Support'].map((accessibility) => (
            <div key={accessibility} className="flex items-center space-x-2">
              <Checkbox
                id={accessibility}
                checked={blueprint.accessibility.includes(accessibility)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setBlueprint(prev => ({ ...prev, accessibility: [...prev.accessibility, accessibility] }));
                  } else {
                    setBlueprint(prev => ({ ...prev, accessibility: prev.accessibility.filter(a => a !== accessibility) }));
                  }
                }}
              />
              <Label htmlFor={accessibility} className="text-sm">{accessibility}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="responsive"
          checked={blueprint.responsive}
          onCheckedChange={(checked) => setBlueprint(prev => ({ ...prev, responsive: checked as boolean }))}
        />
        <Label htmlFor="responsive">Responsive Design (Mobile, Tablet, Desktop)</Label>
      </div>
    </div>
  );

  const renderDataRequirements = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Data Types and Structures *</Label>
        {blueprint.dataTypes.map((dataType, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Enter data type (e.g., User profiles, Product catalog, Transaction records)"
              value={dataType}
              onChange={(e) => updateArrayItem('dataTypes', index, e.target.value)}
            />
            {blueprint.dataTypes.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('dataTypes', index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('dataTypes', '')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Data Type
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="storage">Data Storage Requirements</Label>
        <Textarea
          id="storage"
          placeholder="Describe storage needs, data volume, backup requirements, retention policies"
          rows={3}
          value={blueprint.storage}
          onChange={(e) => setBlueprint(prev => ({ ...prev, storage: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label>Data Privacy and Security</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {['Data Encryption at Rest', 'Data Encryption in Transit', 'Personal Data Anonymization', 'Right to be Forgotten', 'Data Export Capability', 'Consent Management', 'Data Minimization', 'Regular Security Audits'].map((privacy) => (
            <div key={privacy} className="flex items-center space-x-2">
              <Checkbox
                id={privacy}
                checked={blueprint.privacy.includes(privacy)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setBlueprint(prev => ({ ...prev, privacy: [...prev.privacy, privacy] }));
                  } else {
                    setBlueprint(prev => ({ ...prev, privacy: prev.privacy.filter(p => p !== privacy) }));
                  }
                }}
              />
              <Label htmlFor={privacy} className="text-sm">{privacy}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Reporting Requirements</Label>
        {blueprint.reporting.map((report, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Enter reporting need (e.g., User analytics, Sales reports, Performance metrics)"
              value={report}
              onChange={(e) => updateArrayItem('reporting', index, e.target.value)}
            />
            {blueprint.reporting.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('reporting', index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('reporting', '')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Report
        </Button>
      </div>
    </div>
  );

  const renderNonFunctionalRequirements = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="performance">Performance Metrics</Label>
        <Textarea
          id="performance"
          placeholder="Define specific performance metrics and benchmarks"
          rows={3}
          value={blueprint.performance}
          onChange={(e) => setBlueprint(prev => ({ ...prev, performance: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reliability">Reliability Requirements</Label>
        <Textarea
          id="reliability"
          placeholder="Describe reliability expectations, error handling, failover procedures"
          rows={3}
          value={blueprint.reliability}
          onChange={(e) => setBlueprint(prev => ({ ...prev, reliability: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="scalability">Scalability Needs</Label>
        <Textarea
          id="scalability"
          placeholder="Describe how the system should scale with growth"
          rows={3}
          value={blueprint.scalability}
          onChange={(e) => setBlueprint(prev => ({ ...prev, scalability: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maintenance">Maintenance Requirements</Label>
        <Textarea
          id="maintenance"
          placeholder="Describe maintenance needs, update procedures, monitoring requirements"
          rows={3}
          value={blueprint.maintenance}
          onChange={(e) => setBlueprint(prev => ({ ...prev, maintenance: e.target.value }))}
        />
      </div>
    </div>
  );

  const renderConstraintsAndDependencies = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Technical Limitations</Label>
        {blueprint.limitations.map((limitation, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Enter technical limitation or constraint"
              value={limitation}
              onChange={(e) => updateArrayItem('limitations', index, e.target.value)}
            />
            {blueprint.limitations.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('limitations', index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('limitations', '')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Limitation
        </Button>
      </div>

      <div className="space-y-2">
        <Label>External Dependencies</Label>
        {blueprint.dependencies.map((dependency, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Enter external dependency (e.g., third-party services, APIs)"
              value={dependency}
              onChange={(e) => updateArrayItem('dependencies', index, e.target.value)}
            />
            {blueprint.dependencies.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('dependencies', index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('dependencies', '')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Dependency
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Regulatory Requirements</Label>
        {blueprint.regulations.map((regulation, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Enter regulatory requirement (e.g., GDPR, HIPAA, SOX)"
              value={regulation}
              onChange={(e) => updateArrayItem('regulations', index, e.target.value)}
            />
            {blueprint.regulations.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('regulations', index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addArrayItem('regulations', '')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Regulation
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="constraints">Budget/Timeline Constraints</Label>
        <Textarea
          id="constraints"
          placeholder="Describe any budget, timeline, or resource constraints"
          rows={3}
          value={blueprint.constraints}
          onChange={(e) => setBlueprint(prev => ({ ...prev, constraints: e.target.value }))}
        />
      </div>
    </div>
  );

  const renderSection = () => {
    switch (currentSection) {
      case 0: return renderProjectOverview();
      case 1: return renderFunctionalRequirements();
      case 2: return renderTechnicalRequirements();
      case 3: return renderUIRequirements();
      case 4: return renderDataRequirements();
      case 5: return renderNonFunctionalRequirements();
      case 6: return renderConstraintsAndDependencies();
      default: return renderProjectOverview();
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Blueprint - DevBlueprint AI</title>
        <meta name="description" content="Create a detailed software requirements blueprint with AI assistance." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={exportBlueprint} disabled={!blueprint.projectName}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={generateBlueprint} disabled={isGenerating || completionPercentage() < 50}>
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Blueprint
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Blueprint Progress</CardTitle>
                  <div className="space-y-2">
                    <Progress value={completionPercentage()} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {completionPercentage()}% complete
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant={currentSection === section.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setCurrentSection(section.id)}
                    >
                      <section.icon className={`h-4 w-4 mr-2 ${section.color}`} />
                      <span className="text-sm">{section.title}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {React.createElement(sections[currentSection].icon, { 
                        className: `h-6 w-6 ${sections[currentSection].color}` 
                      })}
                      <CardTitle className="text-2xl">
                        {sections[currentSection].title}
                      </CardTitle>
                    </div>
                    <CardDescription>
                      {currentSection === 0 && "Define your project's basic information and objectives"}
                      {currentSection === 1 && "Specify what your software should do and how users will interact with it"}
                      {currentSection === 2 && "Define the technical foundation and infrastructure requirements"}
                      {currentSection === 3 && "Design the user interface and experience requirements"}
                      {currentSection === 4 && "Specify data handling, storage, and privacy requirements"}
                      {currentSection === 5 && "Define performance, reliability, and scalability requirements"}
                      {currentSection === 6 && "Identify limitations, dependencies, and constraints"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderSection()}
                  </CardContent>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                    disabled={currentSection === sections.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}