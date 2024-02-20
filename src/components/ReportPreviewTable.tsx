import React from 'react';
import { ReportPreview } from '@src/definitions/Report.ts';
import { Button } from '@src/components/Button.tsx';

type ReportPreviewProps = {
  preview: ReportPreview;
  onAddClick: () => void;
  onEditClick: (columnIndex: number) => void;
};
export const ReportPreviewTable: React.FC<ReportPreviewProps> = ({
  preview,
  onAddClick,
  onEditClick,
}) => {
  return (
    <div className="relative overflow-x-auto border-x dark:border-gray-700">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {preview.columns.map((column, i) => (
              <th
                key={column.key}
                scope="col"
                className="cursor-pointer px-6 py-3 hover:underline"
                onClick={() => onEditClick(i)}
              >
                {column.name}
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
          {preview.records.map((record, i) => (
            <tr key={i} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
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
