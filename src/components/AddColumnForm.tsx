import React, { useState } from 'react';
import { EntityFieldsInput } from '@src/components/EntityFieldsInput.tsx';
import { Entity } from '@src/definitions/Entity.ts';
import { Field, Column } from '@src/definitions/Report.ts';

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
