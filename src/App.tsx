import React, { useState } from 'react';
import { Navbar } from '@src/components/Navbar.tsx';
import { Report } from '@src/definitions/Entity.ts';
import { ReportList } from '@src/components/ReportList.tsx';
import { ReportPage } from '@src/pages/ReportPage.tsx';

export const App: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300">
        <ReportList onReportSelected={setSelectedReport} />
        {selectedReport && <ReportPage />}
      </div>
    </div>
  );
};
