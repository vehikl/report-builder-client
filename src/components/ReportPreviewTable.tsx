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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {preview.columns.map((column, i) => (
              <th
                key={column.name}
                scope="col"
                className="px-6 py-3 cursor-pointer hover:underline"
                onClick={() => onEditClick(i)}
              >
                {column.name}
              </th>
            ))}
            <th scope="col" className="px-6 py-3 flex justify-center">
              <Button onClick={onAddClick} size="sm">
                Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {preview.records.map((record, i) => (
            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {preview.columns.map((column) => (
                <td key={column.name} className="px-6 py-4">
                  {record[column.name]}
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
