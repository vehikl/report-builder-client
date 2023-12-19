import { Column, Field } from '@src/definitions/Report.ts';
import { Entity } from '@src/definitions/Entity.ts';

export const getColumnFields = (column: Column, entity: Entity, entities: Entity[]): Field[] => {
  const fields: Field[] = [];
  let currentExpression = column.expression;
  let currentEntity = entity;

  while (currentExpression.length) {
    const attribute = currentEntity.attributes.find(
      (attribute) => currentExpression === attribute.column,
    );

    if (attribute) {
      fields.push({
        key: attribute.column,
        name: attribute.name,
      });

      break;
    }

    const relation = currentEntity.relations.find((relation) =>
      currentExpression.startsWith(`${relation.accessor}.`),
    );

    if (relation) {
      fields.push({
        key: relation.accessor,
        name: relation.name,
      });

      currentExpression = currentExpression.slice(`${relation.accessor}.`.length);
      const nextEntity = entities.find((entity) => entity.table === relation.related_entity_table);
      if (!nextEntity) {
        break;
      }
      currentEntity = nextEntity;

      continue;
    }

    break;
  }

  return fields;
};
