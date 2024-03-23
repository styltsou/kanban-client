import { useState } from 'react';
import { motion } from 'framer-motion';
import classes from './index.module.scss';
import { Cross1Icon } from '@radix-ui/react-icons';
import { AutoResizeTextarea } from '../../../components/ui/AutoResizeTextArea';

//TODO: Add loading indicator and isDisabled option for button

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
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
        <button type="submit">{isLoading ? '...' : 'Save'}</button>
        {onClose && (
          <button type="button" onClick={onClose}>
            <Cross1Icon />
          </button>
        )}
      </div>
    </motion.form>
  );
};
