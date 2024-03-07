import React from 'react';
import { TextField } from '@src/components/TextField.tsx';
import { EntityFieldsInput } from '@src/components/EntityFieldsInput.tsx';
import { Field, Entity } from '@src/definitions/Entity.ts';

type ExpressionFieldProps = {
  value: Field[];
  onChange: (value: Field[]) => void;
  entity: Entity;
  entities: Entity[];
};
export const ExpressionField: React.FC<ExpressionFieldProps> = ({
  value,
  entities,
  entity,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <TextField
        label="Expression"
        placeholder="Select from the list"
        readOnly
        value={value.map((field) => field.name).join(' > ')}
        inputClass="rounded-b-none"
      />
      <div className="max-h-96 overflow-y-auto">
        <EntityFieldsInput entity={entity} entities={entities} onChange={onChange} value={value} />
      </div>
    </div>
  );
};
