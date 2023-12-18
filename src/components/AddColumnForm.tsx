import React, { FormEventHandler, useState } from 'react';
import { Entity } from '@src/definitions/Entity.ts';
import { Column, Field } from '@src/definitions/Report.ts';
import { TextField } from '@src/components/TextField.tsx';
import { Button } from '@src/components/Button.tsx';
import { ExpressionField } from '@src/components/ExpressionField.tsx';

export type AddColumnProps = {
  entity: Entity;
  entities: Entity[];
  onConfirm: (column: Column) => void;
};

export const AddColumnForm: React.FC<AddColumnProps> = ({ entity, entities, onConfirm }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [name, setName] = useState('');

  const onSelected = (fields: Field[]): void => {
    setFields(fields);
    setName(fields.map((filed) => filed.name).join(' '));
  };

  const onConfirmClick = (): void => {
    onConfirm({
      name,
      expression: fields.map((filed) => filed.key).join('.'),
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
