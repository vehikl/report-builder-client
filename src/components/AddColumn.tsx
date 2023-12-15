import React, { useState } from 'react';
import { EntityFields } from '@src/components/EntityFields.tsx';
import { Entity, Field } from '@src/definitions/Entity.ts';

export type AddColumnProps = {
  entity: Entity;
  entities: Entity[];
  onConfirm: (fields: Field[], name: string) => void;
  name: string;
};

export const AddColumn: React.FC<AddColumnProps> = ({ entity, entities, onConfirm, name }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [updatedName, setUpdatedName] = useState(name);

  return (
    <>
      <div>Path: {fields.map((filed) => filed.path).join('.')}</div>
      <div>Names: {fields.map((filed) => filed.name).join(' > ')}</div>
      <input
        type="text"
        className="border"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      />
      <button onClick={() => onConfirm(fields, updatedName)}>Confirm</button>
      <EntityFields entity={entity} entities={entities} onSelected={setFields} />
    </>
  );
};
