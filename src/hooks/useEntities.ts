import { Entity } from '@src/definitions/Entity.ts';
import { useEffect, useState } from 'react';

export const useEntities = (): Entity[] | null => {
  const [entities, setEntities] = useState<Entity[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      try {
        const response = await fetch('/api/entities', {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const { data } = (await response.json()) as { data: Entity[] };

        setEntities(data);
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') {
          return;
        }
        throw e;
      }
    };

    load();

    return () => controller.abort();
  }, []);

  return entities;
};
