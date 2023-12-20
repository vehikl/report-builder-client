import React, { FormEventHandler, useState } from 'react';
import { Entity, Field } from '@src/definitions/Entity.ts';
import { Column } from '@src/definitions/Report.ts';
import { TextField } from '@src/components/TextField.tsx';
import { Button } from '@src/components/Button.tsx';
import { ExpressionField } from '@src/components/ExpressionField.tsx';
import { getColumnFields } from '@src/services/column.ts';
import { getFieldPath } from '@src/services/field.ts';

export type EditColumnProps = {
  entity: Entity;
  column: Column;
  entities: Entity[];
  onConfirm: (column: Column) => void;
};

export const EditColumnForm: React.FC<EditColumnProps> = ({
  entity,
  entities,
  onConfirm,
  column,
}) => {
  const [fields, setFields] = useState<Field[]>(getColumnFields(column, entity, entities));
  const [name, setName] = useState(column.name);

  const onSelected = (fields: Field[]): void => {
    setFields(fields);
    setName(fields.map((filed) => filed.name).join(' '));
  };

  const onConfirmClick = (): void => {
    onConfirm({
      name,
      expression: fields.map(getFieldPath).join(':'),
    });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onConfirmClick();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <TextField label="Name" value={name} onChange={setName} />
      <ExpressionField entity={entity} entities={entities} onChange={onSelected} value={fields} />
      <Button type="submit">Confirm</Button>
    </form>
  );
};
