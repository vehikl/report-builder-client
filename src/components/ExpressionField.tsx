import React from 'react';
import { TextField } from '@src/components/TextField.tsx';
import { EntityFieldsInput } from '@src/components/EntityFieldsInput.tsx';
import { Attribute, Entity } from '@src/definitions/Entity.ts';

type ExpressionFieldProps = {
  value: Attribute[];
  onChange: (value: Attribute[]) => void;
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
        value={value.map((attribute) => attribute.name).join(' > ')}
        inputClass="rounded-b-none"
      />
      <EntityFieldsInput entity={entity} entities={entities} onChange={onChange} value={value} />
    </div>
  );
};
