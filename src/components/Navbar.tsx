import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Report Builder
        </span>
      </div>
    </nav>
  );
};
