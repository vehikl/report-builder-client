import React from 'react';
import { ReportVisualization } from '@src/definitions/Entity.ts';

type ReportPreviewProps = {
  preview: ReportVisualization;
  onAddClick: () => void;
};
export const ReportPreview: React.FC<ReportPreviewProps> = ({ preview, onAddClick }) => {
  return (
    <div className="relative overflow-x-auto border-x dark:border-gray-700">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {preview.headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3 cursor-pointer hover:underline">
                {header}
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
                <td key={header} className="px-6 py-4">
                  {record[header]}
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
