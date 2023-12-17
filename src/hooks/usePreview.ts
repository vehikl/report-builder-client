import { ReportColumn, ReportVisualization } from '@src/definitions/Entity.ts';
import { useEffect, useState } from 'react';
import qs from 'qs';

export const usePreview = (
  reportName: string,
  columns: ReportColumn[],
): ReportVisualization | null => {
  const [preview, setPreview] = useState<ReportVisualization | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const query = qs.stringify({
        name: reportName,
        columns,
      });

      const response = await fetch(`http://localhost/api/preview-report?${query}`, {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        return;
      }

      const { data } = (await response.json()) as { data: ReportVisualization };

      setPreview(data);
    };

    load();
  }, [columns, reportName]);

  return preview;
};
