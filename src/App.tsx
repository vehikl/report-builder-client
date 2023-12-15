import React, { useEffect, useState } from 'react';
import { Entity, Field } from '@src/definitions/Entity.ts';
import { EntityFields } from '@src/components/EntityFields.tsx';

export const App: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [employee, setEmployee] = useState<Entity | null>(null);
  const [path, setPath] = useState<Field[]>([]);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const response = await fetch('http://localhost/api/entities');

      if (!response.ok) {
        return;
      }

      const { data } = (await response.json()) as { data: Entity[] };

      setEntities(data);
      setEmployee(data.find((entity) => entity.table === 'employees') ?? null);
    };

    load();
  }, []);

  if (!employee) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <h1>Report Builder</h1>
      <div>Path: {path.map((filed) => filed.path).join('.')}</div>
      <div>Names: {path.map((filed) => filed.name).join(' > ')}</div>
      <EntityFields entity={employee} entities={entities} onSelected={setPath} />
    </div>
  );
};
