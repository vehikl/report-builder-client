import React from 'react';
import { ReportPreview } from '@src/definitions/Report.ts';
import { Button } from '@src/components/Button.tsx';
import CaretUpIcon from '@src/assets/caret-up.svg?react';
import CaretDownIcon from '@src/assets/caret-down.svg?react';
import CaretSortIcon from '@src/assets/caret-sort.svg?react';

type ReportPreviewProps = {
  preview: ReportPreview;
  onAddClick: () => void;
  onEditClick: (columnIndex: number) => void;
  onSortClick: (key: string) => void;
};
export const ReportPreviewTable: React.FC<ReportPreviewProps> = ({
  preview,
  onAddClick,
  onEditClick,
  onSortClick,
}) => {
  return (
    <div className="relative overflow-x-auto border dark:border-gray-700 sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {preview.columns.map((column, i) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                <div className="flex">
                  <span className="cursor-pointer hover:underline" onClick={() => onEditClick(i)}>
                    {column.name}
                  </span>
                  <button onClick={() => onSortClick(column.key)}>
                    {column.key === preview.sort?.key && preview.sort.direction === 'asc' ? (
                      <CaretUpIcon className="ms-1.5 h-4 w-4" />
                    ) : column.key === preview.sort?.key && preview.sort.direction === 'desc' ? (
                      <CaretDownIcon className="ms-1.5 h-4 w-4" />
                    ) : (
                      <CaretSortIcon className="ms-1.5 h-4 w-4" />
                    )}
                  </button>
                </div>
              </th>
            ))}
            <th scope="col" className="flex justify-center px-6 py-3">
              <Button onClick={onAddClick} size="sm">
                Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {preview.records.data.map((record, i) => (
            <tr
              key={i}
              className="border-b bg-white last:border-none dark:border-gray-700 dark:bg-gray-800"
            >
              {preview.columns.map((column) => (
                <td key={column.key} className="px-6 py-4">
                  {`${record[column.key] ?? ''}`}
                </td>
              ))}
              <td className="px-6 py-4" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
