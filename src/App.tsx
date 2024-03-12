import React, { useState } from 'react';
import { Navbar } from '@src/components/Navbar.tsx';
import { ReportList } from '@src/components/ReportList.tsx';
import { ReportPage } from '@src/pages/ReportPage.tsx';
import { Spinner } from '@src/components/Spinner.tsx';
import { useEntities } from '@src/hooks/useEntities.ts';
import { Report } from '@src/definitions/Report.ts';
import { EntitiesPage } from '@src/pages/EntitiesPage.tsx';

export const App: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [page, setPage] = useState<'reports' | 'entities'>('reports');
  const entities = useEntities();

  if (!entities) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar onPageChange={setPage} />
      <div className="flex flex-1 overflow-hidden bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-300">
        {page === 'reports' ? (
          <>
            <ReportList onReportSelected={setSelectedReport} />
            {selectedReport && (
              <ReportPage key={selectedReport.id} report={selectedReport} entities={entities} />
            )}
          </>
        ) : (
          <EntitiesPage entities={entities}></EntitiesPage>
        )}
      </div>
    </div>
  );
};
