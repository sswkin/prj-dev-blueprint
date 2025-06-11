'use client';

import { Progress } from '@/components/ui/progress';
import { checkPasswordRequirements, getPasswordStrength } from '@/lib/utils/password';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements = checkPasswordRequirements(password);
  const strength = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Password strength</span>
          <span className={`font-medium ${
            strength.score >= 75 ? 'text-green-600' : 
            strength.score >= 50 ? 'text-yellow-600' : 
            'text-red-600'
          }`}>
            {strength.label}
          </span>
        </div>
        <Progress value={strength.score} className="h-2" />
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Password must contain:</p>
        <ul className="space-y-1">
          {requirements.map((req, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm">
              {req.met ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <X className="h-3 w-3 text-red-500" />
              )}
              <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>
                {req.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}