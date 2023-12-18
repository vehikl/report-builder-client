import React from 'react';
import cx from 'classnames';

type TextFieldProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
};
export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  readOnly = false,
}) => {
  return (
    <label className="block text-sm font-medium text-gray-900 dark:text-white">
      {label}
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        className={cx(
          'mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500',
          {
            'bg-gray-50 dark:text-white': !disabled && !readOnly,
            'bg-gray-100 dark:text-gray-400': disabled || readOnly,
            'cursor-not-allowed': disabled,
          },
        )}
        required
      />
    </label>
  );
};
