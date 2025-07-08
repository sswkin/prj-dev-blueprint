import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Building2, Users, Mail, Phone, HelpCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';

import type { OrganizationData } from '@/types/onboarding';

interface OrganizationStepProps {
  data?: OrganizationData;
  onUpdate: (data: OrganizationData) => void;
  onNext: () => void;
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Media & Entertainment',
  'Real Estate',
  'Non-profit',
  'Government',
  'Other'
];

const employeeCounts = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+'
];

export const OrganizationStep: React.FC<OrganizationStepProps> = ({
  data,
  onUpdate,
  onNext
}) => {
  const [formData, setFormData] = useState<OrganizationData>({
    name: data?.name || '',
    industry: data?.industry || '',
    employeeCount: data?.employeeCount || '',
    logo: data?.logo || null,
    contactName: data?.contactName || '',
    contactEmail: data?.contactEmail || '',
    contactPhone: data?.contactPhone || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof OrganizationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, logo: 'Logo file must be less than 5MB' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, logo: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      if (errors.logo) {
        setErrors(prev => ({ ...prev, logo: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Organization name is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }

    if (!formData.employeeCount) {
      newErrors.employeeCount = 'Please select employee count';
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
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
            <Building2 className="h-5 w-5 text-primary" />
            Organization Setup
          </CardTitle>
          <CardDescription>
            Let's start by setting up your organization profile. This information helps us customize your experience.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Organization Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Organization Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orgName" className="flex items-center gap-2">
                  Organization Name *
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The official name of your company or organization</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="orgName"
                  placeholder="Enter your organization name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => handleInputChange('industry', value)}
                >
                  <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-sm text-red-500">{errors.industry}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeCount">Number of Employees *</Label>
                <Select
                  value={formData.employeeCount}
                  onValueChange={(value) => handleInputChange('employeeCount', value)}
                >
                  <SelectTrigger className={errors.employeeCount ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select employee count" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeCounts.map((count) => (
                      <SelectItem key={count} value={count}>
                        {count} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.employeeCount && (
                  <p className="text-sm text-red-500">{errors.employeeCount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Organization Logo (Optional)</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className={errors.logo ? 'border-red-500' : ''}
                    />
                    {errors.logo && (
                      <p className="text-sm text-red-500 mt-1">{errors.logo}</p>
                    )}
                  </div>
                  {logoPreview && (
                    <div className="w-16 h-16 border rounded-lg overflow-hidden">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Primary Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Primary Contact Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  placeholder="Enter contact person's name"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className={errors.contactName ? 'border-red-500' : ''}
                />
                {errors.contactName && (
                  <p className="text-sm text-red-500">{errors.contactName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Email *
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="Enter contact email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className={errors.contactEmail ? 'border-red-500' : ''}
                />
                {errors.contactEmail && (
                  <p className="text-sm text-red-500">{errors.contactEmail}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Phone (Optional)
                </Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="Enter contact phone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Information Alert */}
          <Alert>
            <Building2 className="h-4 w-4" />
            <AlertDescription>
              This information will be used to set up your organization profile and can be updated later in your settings.
            </AlertDescription>
          </Alert>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit} size="lg">
              Continue to Team Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};