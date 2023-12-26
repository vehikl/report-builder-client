import React, { ComponentProps, ReactNode } from 'react';
import cx from 'classnames';

type ButtonSize = 'sm' | 'md';

type ButtonProps = {
  type?: ComponentProps<'button'>['type'];
  children: ReactNode;
  onClick?: () => void;
  size?: ButtonSize;
};
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = 'md',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        'bg-blue-700 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        size === 'sm' && 'rounded-md px-3 py-1.5 text-xs',
        size === 'md' && 'rounded-lg px-5 py-2.5 text-sm',
      )}
    >
      {children}
    </button>
  );
};
