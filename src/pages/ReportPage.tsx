import React, { useState } from 'react';
import { ColumnCreationData, Entity, Report } from '@src/definitions/Entity.ts';
import { TextField } from '@src/components/TextField.tsx';
import { ReportPreview } from '@src/components/ReportPreview.tsx';
import { Modal } from '@src/components/Modal.tsx';
import { AddColumn } from '@src/components/AddColumn.tsx';
import { usePreview } from '@src/hooks/usePreview.ts';

type ReportPageProps = {
  report: Report;
  entities: Entity[];
  employeeEntity: Entity;
};

export const ReportPage: React.FC<ReportPageProps> = ({ report, entities, employeeEntity }) => {
  const [name, setName] = useState(report.name);
  const [addingColumn, setAddingColumn] = useState(false);
  const [columns, setColumns] = useState<ColumnCreationData[]>(
    report.columns.map(({ name, expression }) => ({
      name,
      fields: expression.split('.').map((path) => ({ name, path })),
    })),
  );
  const preview = usePreview(report.name, columns);

  const onAddConfirm = (column: ColumnCreationData): void => {
    setColumns([...columns, column]);
    setAddingColumn(false);
  };

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
        <AddColumn entity={employeeEntity} entities={entities} onConfirm={onAddConfirm} name="" />
      </Modal>
    </div>
  );
};
