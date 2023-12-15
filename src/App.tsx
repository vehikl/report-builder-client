import React, { useEffect, useState } from 'react';
import { Entity, Field } from '@src/definitions/Entity.ts';
import { Modal } from '@src/components/Modal.tsx';
import { AddColumn } from '@src/components/AddColumn.tsx';

export const App: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [employee, setEmployee] = useState<Entity | null>(null);
  const [addingColumn, setAddingColumn] = useState(false);
  const [values, setValues] = useState<Field[][]>([]);

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

  const onAddConfirm = (fields: Field[]): void => {
    setValues([...values, fields]);
    setAddingColumn(false);
  };

  if (!employee) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <h1>Report Builder</h1>
      <button onClick={() => setAddingColumn(true)}>Add Column</button>
      {values.map((fields, i) => (
        <div key={i}>{fields.map((filed) => filed.path).join('.')}</div>
      ))}
      <Modal isOpen={addingColumn} onClose={() => setAddingColumn(false)} title="Add Column">
        <AddColumn entity={employee} entities={entities} onConfirm={onAddConfirm} />
      </Modal>
    </div>
  );
};
