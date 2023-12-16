import React, { useState } from 'react';
import { CreateReportPage } from '@src/pages/CreateReportPage.tsx';
import { ReportPage } from '@src/pages/ReportPage.tsx';

type PageId = 'home' | 'create-report' | 'report';

export const App: React.FC = () => {
  const [page, setPage] = useState<PageId>('report');

  const pageComponent = {
    home: <h2>Home Page</h2>,
    'create-report': <CreateReportPage />,
    report: <ReportPage />,
  }[page];

  return (
    <div>
      <h1>Report Builder</h1>
      <div className="flex gap-4">
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('create-report')}>New Report</button>
        <button onClick={() => setPage('report')}>Report</button>
      </div>
      {pageComponent}
    </div>
  );
};
