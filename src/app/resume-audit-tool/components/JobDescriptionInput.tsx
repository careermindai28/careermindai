'use client';

import { ChangeEvent } from 'react';
import Icon from '@/components/ui/AppIcon';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string;
}

const JobDescriptionInput = ({ value, onChange, error }: JobDescriptionInputProps) => {
  const maxLength = 5000;
  const currentLength = value.length;
  const percentage = (currentLength / maxLength) * 100;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="jobDescription" className="block text-sm font-medium text-foreground">
        Job Description <span className="text-destructive">*</span>
      </label>
      
      <textarea
        id="jobDescription"
        value={value}
        onChange={handleChange}
        placeholder="Paste the complete job description here including responsibilities, requirements, and qualifications..."
        className={`w-full h-48 px-4 py-3 rounded-lg border ${
          error ? 'border-destructive' : 'border-border'
        } bg-surface text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-150`}
        aria-describedby={error ? 'jd-error' : 'jd-counter'}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-full max-w-[200px] h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                percentage > 90 ? 'bg-warning' : percentage > 70 ? 'bg-accent' : 'bg-primary'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <span
            id="jd-counter"
            className={`text-xs ${
              percentage > 90 ? 'text-warning' : 'text-text-secondary'
            }`}
          >
            {currentLength} / {maxLength}
          </span>
        </div>

        {error && (
          <p id="jd-error" className="text-sm text-destructive flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} />
            <span>{error}</span>
          </p>
        )}
      </div>

      <p className="text-xs text-text-secondary flex items-start space-x-1">
        <Icon name="InformationCircleIcon" size={16} className="flex-shrink-0 mt-0.5" />
        <span>
          Include complete job requirements, responsibilities, and qualifications for accurate analysis
        </span>
      </p>
    </div>
  );
};

export default JobDescriptionInput;