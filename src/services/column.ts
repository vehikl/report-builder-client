import { Column } from '@src/definitions/Report.ts';
import { Entity, Field } from '@src/definitions/Entity.ts';

export const getColumnFields = (column: Column, entity: Entity, entities: Entity[]): Field[] => {
  const ids = column.expression.replace(/:\w*/, '').split(',');

  const attributeId = ids.pop();

  const fields: Field[] = [];
  let currentEntity: Entity | null = entity;

  ids.forEach((id) => {
    const relation = currentEntity?.relations.find((entity) => entity.id.toString() === id);

    if (relation) {
      fields.push(relation);
      currentEntity = entities.find((entity) => entity.id === relation.related_entity_id) ?? null;
    }
  });

  const attribute = currentEntity.attributes.find(
    (attribute) => attribute.id.toString() === attributeId,
  );

  if (attribute) {
    fields.push(attribute);
  }

  return fields;
};
