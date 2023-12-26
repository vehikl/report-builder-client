import React, { useEffect, useState } from 'react';
import { Report } from '@src/definitions/Report.ts';
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
    <ul className="flex min-w-[200px] flex-col gap-2 border-r border-gray-200 p-4 dark:border-gray-700">
      {reports.map((report) => (
        <li
          key={report.id}
          className="flex w-full cursor-pointer flex-col"
          onClick={() => onReportSelected(report)}
        >
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {report.name}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {report.columns.length} columns
          </p>
        </li>
      ))}
    </ul>
  );
};
