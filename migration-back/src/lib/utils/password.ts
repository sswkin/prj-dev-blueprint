<<<<<<< HEAD
import { PasswordRequirement } from '@/lib/types/auth';

export const passwordRequirements: PasswordRequirement[] = [
  {
    label: 'At least 8 characters',
    regex: /.{8,}/,
    met: false,
  },
  {
    label: 'One uppercase letter',
    regex: /[A-Z]/,
    met: false,
  },
  {
    label: 'One lowercase letter',
    regex: /[a-z]/,
    met: false,
  },
  {
    label: 'One number',
    regex: /\d/,
    met: false,
  },
  {
    label: 'One special character',
    regex: /[^A-Za-z0-9]/,
    met: false,
  },
];

export const checkPasswordRequirements = (password: string): PasswordRequirement[] => {
  return passwordRequirements.map((req) => ({
    ...req,
    met: req.regex.test(password),
  }));
};

export const getPasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  const requirements = checkPasswordRequirements(password);
  const metCount = requirements.filter((req) => req.met).length;
  
  if (metCount === 0) {
    return { score: 0, label: 'Very Weak', color: 'bg-red-500' };
  } else if (metCount <= 2) {
    return { score: 25, label: 'Weak', color: 'bg-red-400' };
  } else if (metCount <= 3) {
    return { score: 50, label: 'Fair', color: 'bg-yellow-500' };
  } else if (metCount <= 4) {
    return { score: 75, label: 'Good', color: 'bg-blue-500' };
  } else {
    return { score: 100, label: 'Strong', color: 'bg-green-500' };
  }
=======
import { PasswordRequirement } from '@/lib/types/auth';

export const passwordRequirements: PasswordRequirement[] = [
  {
    label: 'At least 8 characters',
    regex: /.{8,}/,
    met: false,
  },
  {
    label: 'One uppercase letter',
    regex: /[A-Z]/,
    met: false,
  },
  {
    label: 'One lowercase letter',
    regex: /[a-z]/,
    met: false,
  },
  {
    label: 'One number',
    regex: /\d/,
    met: false,
  },
  {
    label: 'One special character',
    regex: /[^A-Za-z0-9]/,
    met: false,
  },
];

export const checkPasswordRequirements = (password: string): PasswordRequirement[] => {
  return passwordRequirements.map((req) => ({
    ...req,
    met: req.regex.test(password),
  }));
};

export const getPasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  const requirements = checkPasswordRequirements(password);
  const metCount = requirements.filter((req) => req.met).length;
  
  if (metCount === 0) {
    return { score: 0, label: 'Very Weak', color: 'bg-red-500' };
  } else if (metCount <= 2) {
    return { score: 25, label: 'Weak', color: 'bg-red-400' };
  } else if (metCount <= 3) {
    return { score: 50, label: 'Fair', color: 'bg-yellow-500' };
  } else if (metCount <= 4) {
    return { score: 75, label: 'Good', color: 'bg-blue-500' };
  } else {
    return { score: 100, label: 'Strong', color: 'bg-green-500' };
  }
>>>>>>> 0c505267f58ef340ae0d22ee947ae3530d5e65ce
};