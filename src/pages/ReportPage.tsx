import React, { useEffect, useState } from 'react';
import { Report, ReportVisualization } from '@src/definitions/Entity.ts';
import { TextField } from '@src/components/TextField.tsx';
import { ReportPreview } from '@src/components/ReportPreview.tsx';

type ReportPageProps = {
  report: Report;
};

export const ReportPage: React.FC<ReportPageProps> = ({ report }) => {
  const [preview, setPreview] = useState<ReportVisualization | null>(null);
  const [name, setName] = useState(report.name);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const response = await fetch(`http://localhost/api/reports/${report.id}/preview`);

      if (!response.ok) {
        return;
      }

      const { data } = (await response.json()) as { data: ReportVisualization };

      setPreview(data);
    };

    load();
  }, [report.id]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="p-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {report.name}
      </h2>
      <form className="max-w-sm mx-auto">
        <TextField value={name} onChange={setName} />
      </form>
      {preview && <ReportPreview preview={preview} />}
    </div>
  );
};
