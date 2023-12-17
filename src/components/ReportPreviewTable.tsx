import React from 'react';
import { Column, ReportPreview } from '@src/definitions/Report.ts';

type ReportPreviewProps = {
  preview: ReportPreview;
  onAddClick: () => void;
  onEditClick: (header: Column) => void;
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
            {preview.headers.map((header) => (
              <th
                key={header.name}
                scope="col"
                className="px-6 py-3 cursor-pointer hover:underline"
                onClick={() => onEditClick(header)}
              >
                {header.name}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:underline"
              onClick={onAddClick}
            >
              +
            </th>
          </tr>
        </thead>
        <tbody>
          {preview.records.map((record, i) => (
            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {preview.headers.map((header) => (
                <td key={header.name} className="px-6 py-4">
                  {record[header.name]}
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
