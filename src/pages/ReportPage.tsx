import React, { useState } from 'react';
import { Entity } from '@src/definitions/Entity.ts';
import { Report, Column } from '@src/definitions/Report.ts';
import { TextField } from '@src/components/TextField.tsx';
import { ReportPreviewTable } from '@src/components/ReportPreviewTable.tsx';
import { Modal } from '@src/components/Modal.tsx';
import { AddColumnForm } from '@src/components/AddColumnForm.tsx';
import { usePreview } from '@src/hooks/usePreview.ts';
import { EditColumnForm } from '@src/components/EditColumnForm.tsx';

type ReportPageProps = {
  report: Report;
  entities: Entity[];
  employeeEntity: Entity;
};

export const ReportPage: React.FC<ReportPageProps> = ({ report, entities, employeeEntity }) => {
  const [name, setName] = useState(report.name);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);
  const [columns, setColumns] = useState<Column[]>(report.columns);
  const preview = usePreview(report.name, columns);

  const onAddConfirm = (column: Column): void => {
    setColumns([...columns, column]);
    setIsAddingColumn(false);
  };

  const onEditConfirm = (column: Column): void => {
    const index = columns.findIndex((c) => c === editingColumn);
    columns.splice(index, 1, column);
    setColumns(columns.slice());
    setEditingColumn(null);
  };

  return (
    <div className="flex flex-col flex-1 p-4 gap-4 overflow-x-auto">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {report.name}
      </h2>
      <form className="max-w-xs">
        <TextField value={name} onChange={setName} />
      </form>

      {preview && (
        <ReportPreviewTable
          preview={preview}
          onAddClick={() => setIsAddingColumn(true)}
          onEditClick={setEditingColumn}
        />
      )}

      <Modal isOpen={isAddingColumn} onClose={() => setIsAddingColumn(false)} title="Add Column">
        <AddColumnForm entity={employeeEntity} entities={entities} onConfirm={onAddConfirm} />
      </Modal>
      <Modal isOpen={!!editingColumn} onClose={() => {}} title="Edit Column">
        {editingColumn && (
          <EditColumnForm
            entity={employeeEntity}
            entities={entities}
            onConfirm={onEditConfirm}
            column={editingColumn}
          />
        )}
      </Modal>
    </div>
  );
};
