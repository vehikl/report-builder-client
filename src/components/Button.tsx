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
        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
        {
          'rounded-md text-xs px-3 py-1.5': size === 'sm',
          'rounded-lg text-sm px-5 py-2.5': size === 'md',
        },
      )}
    >
      {children}
    </button>
  );
};
