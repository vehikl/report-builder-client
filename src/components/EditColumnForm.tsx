import React, { useState } from 'react';
import { EntityFieldsInput } from '@src/components/EntityFieldsInput.tsx';
import { Entity } from '@src/definitions/Entity.ts';
import { Field, Column } from '@src/definitions/Report.ts';

export type EditColumnProps = {
  entity: Entity;
  entities: Entity[];
  column: Column;
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

  return (
    <>
      <div>Expression: {fields.map((filed) => filed.name).join(' > ')}</div>
      <input
        type="text"
        className="border"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onConfirmClick}>Confirm</button>
      <EntityFieldsInput entity={entity} entities={entities} onSelected={onSelected} />
    </>
  );
};
