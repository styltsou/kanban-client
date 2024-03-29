import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { cn } from '@/utils/cn';
import classes from './index.module.scss';

interface AutoResizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  autoFocus?: boolean;
  autoSelect?: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  className,
  value,
  autoSelect = false,
  autoFocus = false,
  onChange,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaValue, setTextareaValue] = useState(value);

  useEffect(() => {
    if (textareaRef.current) {
      if (autoFocus) {
        setTimeout(() => {
          textareaRef.current?.focus();
        }, 0);
      }

      if (autoSelect) {
        setTimeout(() => {
          textareaRef.current?.select();
        }, 0);
      }
    }
  }, [autoFocus, autoSelect]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setTextareaValue(newValue);
    onChange(event);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget?.form?.dispatchEvent(
        new Event('submit', { cancelable: true }),
      );
    }
  };

  return (
    <div className={classes.Wrapper}>
      <div className={cn(classes.ReplicatedText, className)} style={rest.style}>
        {textareaValue}
      </div>
      <textarea
        ref={textareaRef}
        className={cn(classes.Textarea, className)}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    </div>
  );
};
