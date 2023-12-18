import React, { ReactNode, useState } from 'react';
import { Entity, Relation } from '@src/definitions/Entity.ts';
import { Field } from '@src/definitions/Report.ts';
import ChevronUpIcon from '@src/assets/chevron-up.svg?react';
import cx from 'classnames';

type FieldButtonProps = {
  onClick: () => void;
  children: ReactNode;
  isExpandable?: boolean;
  isExpanded?: boolean;
  isLast: boolean;
};

const FieldButton: React.FC<FieldButtonProps> = ({
  onClick,
  children,
  isExpandable,
  isExpanded,
  isLast,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cx(
        'flex items-center justify-between w-full p-2 text-gray-900 border-gray-300 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 gap-3',
        {
          'font-bold': isExpandable,
          'border-b': !isLast,
        },
      )}
    >
      <span>{children}</span>
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
  entity: Entity;
  entities: Entity[];
  onSelected: (fields: Field[]) => void;
  isCollection?: boolean;
  isRoot?: boolean;
};

export const EntityFieldsInput: React.FC<EntityFieldsProps> = ({
  entity,
  entities,
  onSelected,
  isCollection = false,
  isRoot = false,
}) => {
  const [selectedRelation, setSelectedRelation] = useState<Relation | null>(null);

  const selectedEntity = entities.find(
    (entity) => entity.table === selectedRelation?.related_entity_table,
  );

  return (
    <ul
      className={cx(
        'pl-4 border-b border-gray-300 text-gray-900 text-sm bg-gray-50 dark:text-white dark:bg-gray-700 dark:border-gray-600',
        {
          'rounded-b-lg border-x': isRoot,
        },
      )}
    >
      {isCollection ? (
        <li>
          <FieldButton onClick={() => onSelected([{ key: '(count)', name: 'Total' }])} isLast>
            Total
          </FieldButton>
        </li>
      ) : (
        <>
          {entity.attributes.map((attribute, i) => (
            <li key={attribute.id}>
              <FieldButton
                isLast={entity.attributes.length - 1 === i}
                onClick={() => onSelected([{ key: attribute.column, name: attribute.name }])}
              >
                {attribute.name}
              </FieldButton>
            </li>
          ))}
          {entity.relations.map((relation, i) => (
            <li key={relation.id}>
              <FieldButton
                isLast={entity.relations.length - 1 === i}
                onClick={() => setSelectedRelation(relation)}
                isExpandable
                isExpanded={selectedRelation === relation}
              >
                {relation.name}
              </FieldButton>
              {selectedEntity && selectedRelation === relation && (
                <EntityFieldsInput
                  entity={selectedEntity}
                  entities={entities}
                  onSelected={(fields) =>
                    onSelected([{ key: relation.accessor, name: relation.name }, ...fields])
                  }
                  isCollection={selectedRelation.is_collection}
                />
              )}
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
