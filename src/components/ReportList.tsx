import React, { useEffect, useState } from 'react';
import { Report } from '@src/definitions/Entity.ts';
import { Spinner } from '@src/components/Spinner.tsx';

export type ReportListProps = {
  onReportSelected: (report: Report) => void;
};

export const ReportList: React.FC<ReportListProps> = ({ onReportSelected }) => {
  const [reports, setReports] = useState<Report[] | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const response = await fetch('http://localhost/api/reports');

      if (!response.ok) {
        return;
      }

      const { data } = (await response.json()) as { data: Report[] };

      setReports(data);
    };

    load();
  }, []);

  if (!reports) {
    return <Spinner />;
  }

  if (!reports.length) {
    return <span>No reports yet.</span>;
  }

  return (
    <ul className="min-w-[200px] p-2 divide-y divide-gray-200 dark:divide-gray-700 border-r border-gray-200 dark:border-gray-700">
      {reports.map((report) => (
        <li
          className="flex flex-col flex-1 w-full cursor-pointer"
          onClick={() => onReportSelected(report)}
        >
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {report.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {report.columns.length} columns
          </p>
        </li>
      ))}
    </ul>
  );
};
