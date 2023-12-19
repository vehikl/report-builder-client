import React, { useState } from 'react';
import { Entity } from '@src/definitions/Entity.ts';
import { Column, Report } from '@src/definitions/Report.ts';
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
  const [editingColumnIndex, setEditingColumnIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState(report.columns);
  const preview = usePreview(report.name, columns);

  console.log(editingColumnIndex);

  const onAddConfirm = (column: Column): void => {
    setColumns([...columns, column]);
    setIsAddingColumn(false);
  };

  const onEditConfirm = (column: Column): void => {
    if (editingColumnIndex == null) {
      return;
    }
    columns.splice(editingColumnIndex, 1, column);
    setColumns(columns.slice());
    setEditingColumnIndex(null);
  };

  return (
    <div className="flex flex-col flex-1 p-4 gap-4 overflow-x-auto">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {report.name}
      </h2>
      <form className="max-w-xs">
        <TextField label="Report Name" value={name} onChange={setName} />
      </form>

      {preview && (
        <ReportPreviewTable
          preview={preview}
          onAddClick={() => setIsAddingColumn(true)}
          onEditClick={setEditingColumnIndex}
        />
      )}

      <Modal isOpen={isAddingColumn} onClose={() => setIsAddingColumn(false)} title="Add Column">
        <AddColumnForm entity={employeeEntity} entities={entities} onConfirm={onAddConfirm} />
      </Modal>
      <Modal
        isOpen={editingColumnIndex != null}
        onClose={() => setEditingColumnIndex(null)}
        title="Edit Column"
      >
        {editingColumnIndex != null && (
          <EditColumnForm
            entity={employeeEntity}
            entities={entities}
            onConfirm={onEditConfirm}
            column={columns[editingColumnIndex]}
          />
        )}
      </Modal>
    </div>
  );
};
