import React, { FormEventHandler, useState } from 'react';
import { Entity } from '@src/definitions/Entity.ts';
import { Column, Field } from '@src/definitions/Report.ts';
import { TextField } from '@src/components/TextField.tsx';
import { Button } from '@src/components/Button.tsx';
import { ExpressionField } from '@src/components/ExpressionField.tsx';

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
  const initialFields = column.expression.split('.').map<Field>((key) => ({
    key,
    name:
      entity.relations.find((relation) => relation.accessor === key)?.name ??
      entity.attributes.find((attribute) => attribute.column === key)?.name ??
      '',
  }));

  const [fields, setFields] = useState<Field[]>(initialFields);
  const [name, setName] = useState(column.name);

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
