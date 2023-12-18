import React, { useState } from 'react';
import { Entity, Relation } from '@src/definitions/Entity.ts';
import { Field } from '@src/definitions/Report.ts';

type EntityFieldsProps = {
  entity: Entity;
  entities: Entity[];
  onSelected: (fields: Field[]) => void;
  isCollection?: boolean;
};

export const EntityFieldsInput: React.FC<EntityFieldsProps> = ({
  entity,
  entities,
  onSelected,
  isCollection = false,
}) => {
  const [selectedRelation, setSelectedRelation] = useState<Relation | null>(null);

  const selectedEntity = entities.find(
    (entity) => entity.table === selectedRelation?.related_entity_table,
  );

  if (isCollection) {
    return (
      <ul className="pl-4 border">
        <li>
          <button type="button" onClick={() => onSelected([{ key: '(count)', name: 'Total' }])}>
            Total
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul className="pl-4 border">
      {entity.attributes.map((attribute) => (
        <li key={attribute.id}>
          <button
            type="button"
            onClick={() => onSelected([{ key: attribute.column, name: attribute.name }])}
          >
            {attribute.name}
          </button>
        </li>
      ))}
      {entity.relations.map((relation) => (
        <li key={relation.id}>
          <button type="button" onClick={() => setSelectedRelation(relation)} className="font-bold">
            {relation.name} {'>'}
          </button>
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
    </ul>
  );
};
