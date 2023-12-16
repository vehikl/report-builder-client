import React, { useState } from 'react';
import { CreateReportPage } from '@src/components/CreateReportPage.tsx';

export const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'create-report'>('create-report');

  const pageComponent = {
    home: <h2>Home Page</h2>,
    'create-report': <CreateReportPage />,
  }[page];

  return (
    <div>
      <h1>Report Builder</h1>
      <div className="flex gap-4">
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('create-report')}>Create Report</button>
      </div>
      {pageComponent}
    </div>
  );
};
