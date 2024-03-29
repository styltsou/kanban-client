import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { cn } from '@/utils/cn';
import classes from './index.module.scss';

// ! THIS THING DOES NOT WORK

interface AutoResizeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  autoFocus?: boolean;
  autoSelect?: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AutoResizeInput: React.FC<AutoResizeInputProps> = ({
  className,
  value,
  autoSelect = false,
  autoFocus = false,
  onChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (inputRef.current) {
      if (autoFocus) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }

      if (autoSelect) {
        setTimeout(() => {
          inputRef.current?.select();
        }, 0);
      }
    }
  }, [autoFocus, autoSelect]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(event);
  };

  return (
    <div className={classes.Wrapper}>
      <div className={cn(classes.ReplicatedText, className)} style={rest.style}>
        {inputValue}
      </div>
      <input
        ref={inputRef}
        className={cn(classes.Input, className)}
        value={value}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};
