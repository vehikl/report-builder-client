import React from 'react';
import cx from 'classnames';

type TextFieldProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  inputClass?: string;
  placeholder?: string;
};
export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  inputClass = '',
  placeholder,
}) => {
  return (
    <label className="block text-sm font-medium text-gray-900 dark:text-white">
      {label}
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        className={cx(
          'mt-2 block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          disabled && 'cursor-not-allowed',
          readOnly && 'placeholder:italic dark:bg-gray-600 dark:py-1.5',
          disabled || readOnly ? 'bg-gray-100 dark:text-gray-400' : 'bg-gray-50 dark:text-white',
          inputClass,
        )}
        required
      />
    </label>
  );
};
