import React from 'react';
import { Column, ReportPreview } from '@src/definitions/Report.ts';

type ReportPreviewProps = {
  preview: ReportPreview;
  onAddClick: () => void;
  onEditClick: (column: Column) => void;
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
            {preview.columns.map((column) => (
              <th
                key={column.name}
                scope="col"
                className="px-6 py-3 cursor-pointer hover:underline"
                onClick={() => onEditClick(column)}
              >
                {column.name}
              </th>
            ))}
            <th scope="col" className="px-6 py-3 flex justify-center">
              <button
                type="button"
                onClick={onAddClick}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add
              </button>
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
