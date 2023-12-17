import React, { useState } from 'react';
import { Navbar } from '@src/components/Navbar.tsx';
import { ReportList } from '@src/components/ReportList.tsx';
import { ReportPage } from '@src/pages/ReportPage.tsx';
import { Spinner } from '@src/components/Spinner.tsx';
import { useEntities } from '@src/hooks/useEntities.ts';
import { Report } from '@src/definitions/Report.ts';

export const App: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { entities, employeeEntity } = useEntities();

  if (!employeeEntity) {
    return <Spinner />;
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300">
        <ReportList onReportSelected={setSelectedReport} />
        {selectedReport && (
          <ReportPage
            key={selectedReport.id}
            report={selectedReport}
            entities={entities}
            employeeEntity={employeeEntity}
          />
        )}
      </div>
    </div>
  );
};
