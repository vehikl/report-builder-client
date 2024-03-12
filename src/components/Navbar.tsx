import React from 'react';
import { Button } from '@src/components/Button.tsx';

export type NavBarProps = {
  onPageChange: (page: 'reports' | 'entities') => void;
};

export const Navbar: React.FC<NavBarProps> = ({ onPageChange }) => {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-none dark:bg-gray-900">
      <div className="flex-wrap items-center justify-between">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Report Builder
        </span>
      </div>
      <ul className="flex gap-2">
        <li>
          <Button onClick={() => onPageChange('reports')}>Reports</Button>
        </li>
        <li>
          <Button onClick={() => onPageChange('entities')}>Entities</Button>
        </li>
      </ul>
    </nav>
  );
};
