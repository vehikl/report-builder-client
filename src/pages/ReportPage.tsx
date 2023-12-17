import React, { useState } from 'react';
import { Entity, Report, ReportColumn } from '@src/definitions/Entity.ts';
import { TextField } from '@src/components/TextField.tsx';
import { ReportPreview } from '@src/components/ReportPreview.tsx';
import { Modal } from '@src/components/Modal.tsx';
import { AddColumnForm } from '@src/components/AddColumnForm.tsx';
import { usePreview } from '@src/hooks/usePreview.ts';

type ReportPageProps = {
  report: Report;
  entities: Entity[];
  employeeEntity: Entity;
};

export const ReportPage: React.FC<ReportPageProps> = ({ report, entities, employeeEntity }) => {
  const [name, setName] = useState(report.name);
  const [addingColumn, setAddingColumn] = useState(false);
  const [columns, setColumns] = useState<ReportColumn[]>(report.columns);
  const preview = usePreview(report.name, columns);

  const onAddConfirm = (column: ReportColumn): void => {
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
        <AddColumnForm entity={employeeEntity} entities={entities} onConfirm={onAddConfirm} />
      </Modal>
    </div>
  );
};
