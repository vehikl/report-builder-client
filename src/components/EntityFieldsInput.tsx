import React from 'react';
import { Entity } from '@src/definitions/Entity.ts';
import { Field } from '@src/definitions/Report.ts';
import ChevronUpIcon from '@src/assets/chevron-up.svg?react';
import cx from 'classnames';

type FieldButtonProps = {
  onClick: () => void;
  label: string;
  isExpandable?: boolean;
  isExpanded?: boolean;
  isEntity?: boolean;
  isSelected?: boolean;
};

const FieldButton: React.FC<FieldButtonProps> = ({
  onClick,
  label,
  isExpandable = false,
  isExpanded = false,
  isEntity = false,
  isSelected = false,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cx(
        'flex items-center justify-between w-full p-2 border-gray-300 dark:border-gray-600 gap-3',
        {
          'font-bold': isExpandable || isEntity,
          'text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800':
            !isSelected,
          'rounded-lg text-white dark:text-gray-900 bg-gray-700 dark:bg-gray-50 hover:bg-gray-800 dark:hover:bg-gray-100':
            isSelected,
        },
      )}
    >
      <span>{label}</span>
      {isExpandable && (
        <ChevronUpIcon
          className={cx('w-3 h-3', {
            'rotate-180': !isExpanded,
          })}
        />
      )}
    </button>
  );
};

type EntityFieldsProps = {
  label?: string;
  entity: Entity;
  entities: Entity[];
  value: Field[];
  onChange: (fields: Field[]) => void;
  isCollection?: boolean;
};

export const EntityFieldsInput: React.FC<EntityFieldsProps> = ({
  label,
  value: fields,
  entity,
  entities,
  onChange,
  isCollection = false,
}) => {
  const field = fields.at(0);
  const isLeaf = !field;
  const selectedAttribute = !field
    ? null
    : entity.attributes.find((attribute) => attribute.column === field.key);

  const selectedRelation = !field
    ? null
    : entity.relations.find((attribute) => attribute.accessor === field.key);

  const selectedEntity = entities.find(
    (entity) => entity.table === selectedRelation?.related_entity_table,
  );

  return (
    <div
      className={cx(
        'border-gray-300 text-gray-900 text-sm bg-gray-50 dark:text-white dark:bg-gray-700 dark:border-gray-600',
        {
          'rounded-b-lg border-x border-b': true,
        },
      )}
    >
      <FieldButton
        label={label ?? entity.name}
        onClick={() => (fields.length ? onChange([]) : onChange)}
        isEntity
        isExpandable={!isLeaf}
        isExpanded={isLeaf}
      />
      {isCollection ? (
        <ul className="pl-2">
          <li>
            <FieldButton onClick={() => {}} label="Count (TBD)" />
          </li>
        </ul>
      ) : (
        <ul className="pl-2">
          {!selectedRelation &&
            entity.attributes.map((attribute) => (
              <li key={attribute.id}>
                <FieldButton
                  label={attribute.name}
                  isSelected={selectedAttribute === attribute}
                  onClick={() => onChange([{ key: attribute.column, name: attribute.name }])}
                />
              </li>
            ))}
          {field && selectedEntity && selectedRelation ? (
            <li>
              <EntityFieldsInput
                label={selectedRelation.name}
                entity={selectedEntity}
                entities={entities}
                value={fields.slice(1)}
                onChange={(fields) => onChange([field, ...fields])}
                isCollection={selectedRelation.is_collection}
              />
            </li>
          ) : (
            entity.relations.map((relation) => (
              <li key={relation.id}>
                <FieldButton
                  isExpandable
                  label={relation.name}
                  onClick={() => onChange([{ key: relation.accessor, name: relation.name }])}
                />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
