import { Column, ReportPreview, Sort } from '@src/definitions/Report.ts';
import { useEffect, useState } from 'react';
import qs from 'qs';

export type PreviewService = {
  preview: ReportPreview | null;
  setPage: (page: number) => void;
  setSort: (sort: Sort | null) => void;
};

export const usePreview = (name: string, entity_id: number, columns: Column[]): PreviewService => {
  const [preview, setPreview] = useState<ReportPreview | null>(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<Sort | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      const query = qs.stringify({ page, sort }, { addQueryPrefix: true });
      const response = await fetch(`/api/reports/preview${query}`, {
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
  }, [columns, entity_id, name, page, sort]);

  return { preview, setPage, setSort };
};
