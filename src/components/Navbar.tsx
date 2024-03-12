import React from 'react';

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
      <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
        <li>
          <button
            onClick={() => onPageChange('reports')}
            className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          >
            Reports
          </button>
        </li>
        <li>
          <button
            onClick={() => onPageChange('entities')}
            className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          >
            Entities
          </button>
        </li>
      </ul>
    </nav>
  );
};
