import React, { useState } from 'react';
import { Entity } from '@src/definitions/Entity.ts';
import { Column, Report } from '@src/definitions/Report.ts';
import { TextField } from '@src/components/TextField.tsx';
import { ReportPreviewTable } from '@src/components/ReportPreviewTable.tsx';
import { Modal } from '@src/components/Modal.tsx';
import { ColumnForm } from '@src/components/ColumnForm.tsx';
import { Button } from '@src/components/Button.tsx';
import { usePreview } from '@src/hooks/usePreview.ts';
import { Pagination } from '@src/components/Pagination.tsx';

type ReportPageProps = {
  report: Report;
  entities: Entity[];
};

export const ReportPage: React.FC<ReportPageProps> = ({ report, entities }) => {
  const [name, setName] = useState(report.name);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [editingColumnIndex, setEditingColumnIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState(report.columns);
  const entity = entities.find((entity) => entity.id === report.entity_id);
  const { preview, setPage, setSort } = usePreview(report.name, report.entity_id, columns);

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

  const onDeleteColumn = (key: string): void => {
    setColumns(columns.filter((column) => column.key !== key));
  };

  async function downloadReport(): Promise<void> {
    const response = await fetch('/api/reports/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: report.name,
        entity_id: report.entity_id,
        columns,
        sort: preview?.sort,
      }),
    });

    if (!response.ok) {
      return;
    }

    const blob = await response.blob();

    const href = URL.createObjectURL(blob);

    const aElement = document.createElement('a');
    aElement.href = href;
    aElement.setAttribute('download', response.headers.get('X-File-Name') ?? 'file.xlsx');
    aElement.setAttribute('target', '_blank');
    aElement.click();

    URL.revokeObjectURL(href);
  }

  if (!entity) {
    return <p>No entity found</p>;
  }

  if (!preview) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-x-auto p-4">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {report.name}
      </h2>
      <form className="flex max-w-xs flex-col justify-center gap-4">
        <TextField label="Report Name" value={name} onChange={setName} />
      </form>

      <div className="flex justify-between gap-4">
        <div className="flex gap-2">
          <Button onClick={() => setIsAddingColumn(true)} size="sm">
            Add Column
          </Button>
          <Button onClick={() => downloadReport()} size="sm">
            Download
          </Button>
        </div>
        <Pagination
          page={preview.records.current_page}
          lastPage={preview.records.last_page}
          onPageChange={setPage}
        />
      </div>

      <ReportPreviewTable
        preview={preview}
        onEditClick={setEditingColumnIndex}
        onDeleteColumn={onDeleteColumn}
        onSortClick={(key) => {
          if (!preview.sort || preview.sort.key !== key) {
            setSort({ key, direction: 'asc' });
            setPage(1);
            return;
          }

          if (preview.sort.direction === 'asc') {
            setSort({ key, direction: 'desc' });
            setPage(1);
            return;
          }

          setSort(null);
          setPage(1);
        }}
      />

      <Modal isOpen={isAddingColumn} onClose={() => setIsAddingColumn(false)} title="Add Column">
        <ColumnForm entity={entity} entities={entities} onConfirm={onAddConfirm} />
      </Modal>
      <Modal
        isOpen={editingColumnIndex != null}
        onClose={() => setEditingColumnIndex(null)}
        title="Edit Column"
      >
        {editingColumnIndex != null && (
          <ColumnForm
            entity={entity}
            entities={entities}
            onConfirm={onEditConfirm}
            column={columns[editingColumnIndex]}
          />
        )}
      </Modal>
    </div>
  );
};
