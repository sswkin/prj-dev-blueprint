import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { TechOption } from '@/types/wizard';

interface OptionCardProps {
  option: TechOption;
  onToggle: () => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({ option, onToggle }) => {
  return (
    <Card 
      className={`hover:shadow-md transition-shadow cursor-pointer ${
        option.selected ? 'border-primary bg-primary/5' : ''
      }`}
      onClick={onToggle}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Checkbox
            checked={option.selected}
            onCheckedChange={() => {}} // Handled by parent onClick
            className="mr-2"
          />
          {option.name}
        </CardTitle>
        <Badge variant="secondary" className="text-xs">
          {option.category}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{option.description}</p>
      </CardContent>
    </Card>
  );
};