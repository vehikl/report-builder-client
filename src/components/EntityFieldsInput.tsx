import React from 'react';
import { Entity, Field } from '@src/definitions/Entity.ts';
import ChevronUpIcon from '@src/assets/chevron-up.svg?react';
import cx from 'classnames';
import { isAttribute, isRelation } from '@src/services/field.ts';

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
        'flex w-full items-center justify-between gap-3 rounded-lg border-gray-300 p-2 dark:border-gray-600',
        (isExpandable || isEntity) && 'font-bold',
        isSelected
          ? 'bg-gray-700 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-100'
          : 'bg-gray-50 text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800',
      )}
    >
      <span>{label}</span>
      {isExpandable && (
        <ChevronUpIcon className={cx('h-3 w-3', !isExpanded && 'flex rotate-180')} />
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

  const selectedAttribute = isAttribute(field) ? field : null;

  const selectedRelation = isRelation(field) ? field : null;

  const selectedEntity = entities.find(
    (entity) => entity.id === selectedRelation?.related_entity_id,
  );

  return (
    <div className="rounded-b-lg border-x border-b border-gray-300 bg-gray-50 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
      <FieldButton
        label={label ?? entity.name}
        onClick={() => (fields.length ? onChange([]) : onChange)}
        isEntity
        isExpandable={!isLeaf}
        isExpanded={isLeaf}
      />
      <ul className="pl-2">
        {isCollection ? (
          <li>
            <FieldButton onClick={() => {}} label="Count (TBD)" />
          </li>
        ) : field && selectedEntity && selectedRelation ? (
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
          <>
            {entity.attributes.map((attribute) => (
              <li key={attribute.id}>
                <FieldButton
                  label={attribute.name}
                  isSelected={selectedAttribute === attribute}
                  onClick={() => onChange([attribute])}
                />
              </li>
            ))}
            {entity.relations.map((relation) => (
              <li key={relation.id}>
                <FieldButton
                  isExpandable
                  label={relation.name}
                  onClick={() => onChange([relation])}
                />
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};
