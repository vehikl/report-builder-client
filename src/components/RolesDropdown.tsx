import React, { useState } from 'react';

export type DropdownProps = {};

const roles = ['SuperAdmin', 'Manager'];

export const RolesDropdown: React.FC<DropdownProps> = () => {
  const [selected, setSelected] = useState(roles);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="inline-flex items-center rounded-md bg-blue-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setOpen(!open)}
      >
        {!selected.length ? 'None' : selected.join(', ')}
        <svg
          className="ms-3 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {open && (
        <div className="relative">
          <div className="absolute left-0 top-0 z-10 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700">
            <ul
              className="space-y-3 p-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownCheckboxButton"
            >
              {roles.sort().map((role) => (
                <li>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      <input
                        id="checkbox-item-1"
                        type="checkbox"
                        checked={selected.includes(role)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelected([...selected, role]);
                            return;
                          }
                          setSelected(selected.filter((item) => item !== role));
                        }}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                      />
                      {role}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
