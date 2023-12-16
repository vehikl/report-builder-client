import React, { useEffect, useState } from 'react';
import { ReportVisualization } from '@src/definitions/Entity.ts';

export const ReportPage: React.FC = () => {
  const [report, setReport] = useState<ReportVisualization | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const response = await fetch('http://localhost/api/reports/1/visualize');

      if (!response.ok) {
        return;
      }

      const { data } = (await response.json()) as { data: ReportVisualization };

      setReport(data);
    };

    load();
  }, []);

  if (!report) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <h2>{report.name}</h2>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {report.headers.map((header) => (
                <th scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {report.records.map((record) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {report.headers.map((header) => (
                  <td className="px-6 py-4">{record[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
