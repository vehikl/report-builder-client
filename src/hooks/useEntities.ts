import { Entity } from '@src/definitions/Entity.ts';
import { useEffect, useState } from 'react';

export const useEntities = (): Entity[] | null => {
  const [entities, setEntities] = useState<Entity[] | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const response = await fetch('http://localhost/api/entities');

      if (!response.ok) {
        return;
      }

      const { data } = (await response.json()) as { data: Entity[] };

      setEntities(data);
    };

    load();
  }, []);

  return entities;
};
