import React, { useState } from 'react';
import { Entity } from '@src/definitions/Entity.ts';
import { Column, Report } from '@src/definitions/Report.ts';
import { TextField } from '@src/components/TextField.tsx';
import { ReportPreviewTable } from '@src/components/ReportPreviewTable.tsx';
import { Modal } from '@src/components/Modal.tsx';
import { ColumnForm } from '@src/components/ColumnForm.tsx';
import { Button } from '@src/components/Button.tsx';
import { usePreview } from '@src/hooks/usePreview.ts';
import { Pagination } from '@src/components/Pagination.tsx';
import { RolesDropdown } from '@src/components/RolesDropdown.tsx';

type EntitiesPageProps = {
  entities: Entity[];
};

export const EntitiesPage: React.FC<EntitiesPageProps> = ({ entities }) => {
  const [currentEntity, setCurrentEntity] = useState(entities[0]);
  return (
    <div className="flex flex-col gap-4 p-4">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Entity
        <select
          value={currentEntity.id}
          onChange={(e) =>
            setCurrentEntity(entities.find((entity) => entity.id === e.target.value)!)
          }
          className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          {entities.map((entity) => (
            <option value={entity.id} selected={entity.id === currentEntity.id}>
              {entity.name}
            </option>
          ))}
        </select>
      </label>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full border text-left text-sm text-gray-500 rtl:text-right dark:border-gray-700 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Field
              </th>
              <th scope="col" className="px-6 py-3">
                Viewable for
              </th>
              <th scope="col" className="px-6 py-3">
                Editable for
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentEntity.fields.map((field) => (
              <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex justify-between gap-4 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {field.name}
                </th>
                <td className="px-6 py-4">
                  <RolesDropdown />
                </td>
                <td className="px-6 py-4">
                  <RolesDropdown />
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
