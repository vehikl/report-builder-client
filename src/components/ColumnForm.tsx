import React, { FormEventHandler, useState } from 'react';
import { Attribute, Entity } from '@src/definitions/Entity.ts';
import { Column } from '@src/definitions/Report.ts';
import { TextField } from '@src/components/TextField.tsx';
import { Button } from '@src/components/Button.tsx';
import { ExpressionField } from '@src/components/ExpressionField.tsx';
import { getColumnAttributes } from '@src/services/column.ts';
import { makeExpressionFromAttributes } from '@src/services/attribute.ts';

export type ColumnFormProps = {
  entity: Entity;
  column?: Column;
  entities: Entity[];
  onConfirm: (column: Column) => void;
};

export const ColumnForm: React.FC<ColumnFormProps> = ({ entity, entities, onConfirm, column }) => {
  const [attributes, setAttributes] = useState<Attribute[]>(
    column ? getColumnAttributes(column, entity, entities) : [],
  );
  const [name, setName] = useState(column?.name ?? '');

  const onSelected = (attributes: Attribute[]): void => {
    setAttributes(attributes);
    setName(attributes.map((attribute) => attribute.name).join(' '));
  };

  const onConfirmClick = (): void => {
    onConfirm({
      name,
      expression: makeExpressionFromAttributes(attributes),
    });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onConfirmClick();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <TextField label="Name" value={name} onChange={setName} />
      <ExpressionField
        entity={entity}
        entities={entities}
        onChange={onSelected}
        value={attributes}
      />
      <Button type="submit">Confirm</Button>
    </form>
  );
};
