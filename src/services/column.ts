import { Column } from '@src/definitions/Report.ts';
import { Attribute, Entity } from '@src/definitions/Entity.ts';
import { getRelatedEntity } from '@src/services/attribute.ts';

export const getColumnAttributes = (
  column: Column,
  entity: Entity,
  entities: Entity[],
): Attribute[] => {
  const ids = column.expression.replace(/:\w*/g, '').split(',');

  const attributes: Attribute[] = [];
  let currentEntity: Entity | null = entity;

  ids.forEach((id) => {
    const attribute = currentEntity?.attributes.find((attribute) => attribute.id.toString() === id);

    if (!attribute) {
      return;
    }

    attributes.push(attribute);
    currentEntity = getRelatedEntity(attribute, entities);
  });

  return attributes;
};
