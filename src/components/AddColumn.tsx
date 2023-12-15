import React, { useState } from 'react';
import { EntityFields } from '@src/components/EntityFields.tsx';
import { Entity, Field } from '@src/definitions/Entity.ts';

export type AddColumnProps = {
  entity: Entity;
  entities: Entity[];
  onConfirm: (fields: Field[]) => void;
};

export const AddColumn: React.FC<AddColumnProps> = ({ entity, entities, onConfirm }) => {
  const [fields, setFields] = useState<Field[]>([]);
  return (
    <>
      <div>Path: {fields.map((filed) => filed.path).join('.')}</div>
      <div>Names: {fields.map((filed) => filed.name).join(' > ')}</div>
      <button onClick={() => onConfirm(fields)}>Confirm</button>
      <EntityFields entity={entity} entities={entities} onSelected={setFields} />
    </>
  );
};
