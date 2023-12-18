import React from 'react';
import { TextField } from '@src/components/TextField.tsx';
import { EntityFieldsInput } from '@src/components/EntityFieldsInput.tsx';
import { Field } from '@src/definitions/Report.ts';
import { Entity } from '@src/definitions/Entity.ts';

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
    <div>
      <TextField
        label="Expression"
        placeholder="Select from the list"
        readOnly
        value={value.map((field) => field.name).join(' > ')}
        inputClass="rounded-b-none"
      />
      <EntityFieldsInput entity={entity} entities={entities} onChange={onChange} value={value} />
    </div>
  );
};
