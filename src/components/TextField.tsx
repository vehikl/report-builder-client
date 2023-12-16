import React from 'react';

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
};
export const TextField: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <label className="block text-sm font-medium text-gray-900 dark:text-white">
      Report Name
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </label>
  );
};
