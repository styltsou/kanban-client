import { useState } from 'react';
import { motion } from 'framer-motion';
import classes from './index.module.scss';
import { Cross1Icon } from '@radix-ui/react-icons';
import { AutoResizeTextarea } from '@/components/ui/AutoResizeTextArea';
import { Button } from '@/components/ui/Button';
//TODO Add disabled button state if needed

export const CardForm: React.FC<{
  initialValue: string;
  onSubmit: (value: string) => void;
  placeholder?: string;
  onClose?: () => void;
  isLoading?: boolean;
  autoFocus?: boolean;
  autoSelect?: boolean;
  textareaWidth?: number | '100%';
  textareaHeight?: number | 'auto';
}> = ({
  initialValue,
  onSubmit,
  placeholder = undefined,
  isLoading = false,
  autoFocus,
  autoSelect,
  textareaWidth = '100%',
  textareaHeight = 'auto',
  onClose = null,
}) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // TODO: Fix form not submitting when hitting enter in textarea

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === '') return;

    onSubmit(value);
    setValue('');
  };

  return (
    <motion.form className={classes.Form} onSubmit={handleSubmit}>
      <AutoResizeTextarea
        className={classes.Textarea}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        autoSelect={autoSelect}
        autoFocus={autoFocus}
        style={{ width: textareaWidth, minHeight: textareaHeight }}
      />
      <div className={classes.ButtonsWrapper}>
        <Button loading={isLoading}>Save</Button>
        {onClose && (
          <button type="button" onClick={onClose}>
            <Cross1Icon />
          </button>
        )}
      </div>
    </motion.form>
  );
};
