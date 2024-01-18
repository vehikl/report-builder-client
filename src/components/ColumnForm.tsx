import React, { FormEventHandler, useState } from 'react';
import { Attribute, Entity } from '@src/definitions/Entity.ts';
import { Column } from '@src/definitions/Report.ts';
import { TextField } from '@src/components/TextField.tsx';
import { Button } from '@src/components/Button.tsx';
import { ExpressionField } from '@src/components/ExpressionField.tsx';
import { getColumnAttributes, isAttributeColumn } from '@src/services/column.ts';
import { makeExpressionFromAttributes } from '@src/services/attribute.ts';
import cx from 'classnames';
import { ExpressionSerializer } from '@src/services/ExpressionSerializer.ts';
import { ExpressionParser } from '@src/services/ExpressionParser.ts';

export type AttributeTabProps = {
  entity: Entity;
  column?: Column;
  entities: Entity[];
  onConfirm: (column: Column) => void;
};

const AttributeTab: React.FC<AttributeTabProps> = ({ column, entity, entities, onConfirm }) => {
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

export type ExpressionTabProps = {
  column?: Column;
  onConfirm: (column: Column) => void;
};

const ExpressionTab: React.FC<ExpressionTabProps> = ({ column, onConfirm }) => {
  const [name, setName] = useState(column?.name ?? '');
  const [expression, setExpression] = useState(ExpressionSerializer.serialize(column?.expression));

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onConfirm({ name, expression: new ExpressionParser().read(expression) });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <TextField label="Name" value={name} onChange={setName} />
      <TextField
        label="Expression"
        value={expression}
        onChange={setExpression}
        inputClass="font-mono"
      />
      <Button type="submit">Confirm</Button>
    </form>
  );
};

export type ColumnFormProps = {
  entity: Entity;
  column?: Column;
  entities: Entity[];
  onConfirm: (column: Column) => void;
};

export const ColumnForm: React.FC<ColumnFormProps> = ({ entity, entities, onConfirm, column }) => {
  const isAttribute = !column || isAttributeColumn(column);
  const [mode, setMode] = useState<'Attribute' | 'Calculation'>(
    isAttribute ? 'Attribute' : 'Calculation',
  );

  return (
    <div>
      <ul className="mb-4 border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
        {['Attribute', 'Calculation'].map((label) => (
          <li
            key={label}
            className={cx(
              'inline-block cursor-pointer rounded-t-lg border-b-2 px-4 py-2',
              mode === label
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
            )}
            onClick={() => setMode(mode === 'Attribute' ? 'Calculation' : 'Attribute')}
          >
            {label}
          </li>
        ))}
      </ul>
      {mode === 'Attribute' ? (
        <AttributeTab column={column} entity={entity} entities={entities} onConfirm={onConfirm} />
      ) : (
        <ExpressionTab column={column} onConfirm={onConfirm} />
      )}
    </div>
  );
};
