import { Column } from '@src/definitions/Report.ts';
import { Entity, Field } from '@src/definitions/Entity.ts';
import { relationMatchesPath } from '@src/services/field.ts';

export const getColumnFields = (column: Column, entity: Entity, entities: Entity[]): Field[] => {
  const fields: Field[] = [];
  let currentEntity: Entity | null = entity;

  column.expression.split(',').forEach((path) => {
    const attribute = currentEntity?.attributes.find((attribute) => attribute.path === path);
    if (attribute) {
      fields.push(attribute);
      return;
    }

    const relation = currentEntity?.relations.find(relationMatchesPath(path));

    if (relation) {
      fields.push(relation);
      currentEntity = entities.find((entity) => entity.id === relation.related_entity_id) ?? null;
    }
  });

  return fields;
};
