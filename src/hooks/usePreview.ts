import { Column, ReportPreview } from '@src/definitions/Report.ts';
import { useEffect, useState } from 'react';

export const usePreview = (
  name: string,
  entity_id: number,
  columns: Column[],
): ReportPreview | null => {
  const [preview, setPreview] = useState<ReportPreview | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      const response = await fetch(`/api/preview-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name,
          entity_id,
          columns,
        }),
      });

      if (!response.ok) {
        return;
      }

      const { data } = (await response.json()) as { data: ReportPreview };

      setPreview(data);
    };

    load();

    return () => controller.abort();
  }, [columns, entity_id, name]);

  return preview;
};
