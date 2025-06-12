import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Database, 
  Download,
  Plus,
  Trash2,
  ChevronRight,
  Lightbulb,
  Target,
  Code,
  Palette,
  Zap,
  Lock,
  Loader2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
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
  // ... Rest of the component code remains exactly the same ...
}