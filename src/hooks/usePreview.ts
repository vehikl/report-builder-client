import { Column, ReportPreview } from '@src/definitions/Report.ts';
import { useEffect, useState } from 'react';
import qs from 'qs';

export const usePreview = (
  name: string,
  entity_id: number,
  columns: Column[],
): ReportPreview | null => {
  const [preview, setPreview] = useState<ReportPreview | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const query = qs.stringify({
        name,
        entity_id,
        columns,
      });

      const response = await fetch(`http://localhost/api/preview-report?${query}`, {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        return;
      }

      const { data } = (await response.json()) as { data: ReportPreview };

      setPreview(data);
    };

    load();
  }, [columns, name]);

  return preview;
};
