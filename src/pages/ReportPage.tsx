import React, { useEffect, useState } from 'react';
import {
  ColumnCreationData,
  Entity,
  Report,
  ReportVisualization,
} from '@src/definitions/Entity.ts';
import { TextField } from '@src/components/TextField.tsx';
import { ReportPreview } from '@src/components/ReportPreview.tsx';
import { Modal } from '@src/components/Modal.tsx';
import { AddColumn } from '@src/components/AddColumn.tsx';
import { Spinner } from '@src/components/Spinner.tsx';
import qs from 'qs';

type ReportPageProps = {
  report: Report;
};

export const ReportPage: React.FC<ReportPageProps> = ({ report }) => {
  const [preview, setPreview] = useState<ReportVisualization | null>(null);
  const [name, setName] = useState(report.name);
  const [addingColumn, setAddingColumn] = useState(false);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [employee, setEmployee] = useState<Entity | null>(null);
  const [columns, setColumns] = useState<ColumnCreationData[]>(
    report.columns.map(({ name, expression }) => ({
      name,
      fields: expression.split('.').map((path) => ({ name, path })),
    })),
  );

  useEffect(() => {
    const loadEntities = async (): Promise<void> => {
      const response = await fetch('http://localhost/api/entities');

      if (!response.ok) {
        return;
      }

      const { data } = (await response.json()) as { data: Entity[] };

      setEntities(data);
      setEmployee(data.find((entity) => entity.table === 'employees') ?? null);
    };

    loadEntities();
  }, [report.id]);

  useEffect(() => {
    const loadModificationPreview = async (): Promise<void> => {
      const query = qs.stringify({
        name: report.name,
        columns: columns.map(({ name, fields }) => ({
          name,
          expression: fields.map((filed) => filed.path).join('.'),
        })),
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

    loadModificationPreview();
  }, [columns, report.name]);

  const onAddConfirm = (column: ColumnCreationData): void => {
    setColumns([...columns, column]);
    setAddingColumn(false);
  };

  if (!employee) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col flex-1 p-4 gap-4 overflow-x-auto">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {report.name}
      </h2>
      <form className="max-w-xs">
        <TextField value={name} onChange={setName} />
      </form>

      {preview && <ReportPreview preview={preview} onAddClick={() => setAddingColumn(true)} />}

      <Modal isOpen={addingColumn} onClose={() => setAddingColumn(false)} title="Add Column">
        <AddColumn entity={employee} entities={entities} onConfirm={onAddConfirm} name="" />
      </Modal>
    </div>
  );
};
