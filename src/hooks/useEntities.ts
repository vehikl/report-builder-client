import { Entity } from '@src/definitions/Entity.ts';
import { useEffect, useState } from 'react';

export type EntitiesService =
  | {
      entities: Entity[];
      employeeEntity: Entity;
    }
  | {
      entities: null;
      employeeEntity: null;
    };

export const useEntities = (): EntitiesService => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [employeeEntity, setEmployeeEntity] = useState<Entity | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const response = await fetch('http://localhost/api/entities');

      if (!response.ok) {
        return;
      }

      const { data } = (await response.json()) as { data: Entity[] };

      setEntities(data);
      setEmployeeEntity(data.find((entity) => entity.table === 'employees') ?? null);
    };

    load();
  }, []);

  if (!entities || !employeeEntity) {
    return {
      entities: null,
      employeeEntity: null,
    };
  }

  return {
    entities,
    employeeEntity,
  };
};
