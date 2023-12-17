import React, { useEffect, useState } from 'react';
import { Modal } from '@src/components/Modal.tsx';
import { AddColumnForm } from '@src/components/AddColumnForm.tsx';
import { ColumnCreationData, CreateReportData, Entity } from '@src/definitions/Entity.ts';

export const CreateReportPage: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [employee, setEmployee] = useState<Entity | null>(null);
  const [addingColumn, setAddingColumn] = useState(false);
  const [columns, setColumns] = useState<ColumnCreationData[]>([]);

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

  const onAddConfirm = (column: ColumnCreationData): void => {
    setColumns([...columns, column]);
    setAddingColumn(false);
  };

  const onCreate = (): void => {
    const report: CreateReportData = {
      name: 'TBD',
      columns: columns.map((c) => ({
        name: c.name,
        expression: c.fields.map((f) => f.path).join('.'),
      })),
    };
    console.log(report);
  };

  if (!employee) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="flex gap-4">
        <button onClick={() => setAddingColumn(true)}>Add Column</button>
        <button onClick={onCreate}>Create Report</button>
      </div>
      {columns.map((column, i) => (
        <div key={i}>
          {column.name}: {column.fields.map((field) => field.path).join('.')}
        </div>
      ))}
      <Modal isOpen={addingColumn} onClose={() => setAddingColumn(false)} title="Add Column">
        <AddColumnForm entity={employee} entities={entities} onConfirm={onAddConfirm} name="" />
      </Modal>
    </>
  );
};
