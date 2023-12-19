import { Column, Field } from '@src/definitions/Report.ts';
import { Entity } from '@src/definitions/Entity.ts';
import { getRelationPath, relationMatchesPath } from '@src/services/relation.ts';

export const getColumnFields = (column: Column, entity: Entity, entities: Entity[]): Field[] => {
  const fields: Field[] = [];
  let currentEntity: Entity | null = entity;

  column.expression.split(':').forEach((path) => {
    const attribute = currentEntity?.attributes.find((attribute) => attribute.path === path);
    if (attribute) {
      fields.push({
        key: attribute.path,
        name: attribute.name,
      });
      return;
    }

    const relation = currentEntity?.relations.find(relationMatchesPath(path));

    if (relation) {
      fields.push({
        key: getRelationPath(relation),
        name: relation.name,
      });
      currentEntity = entities.find((entity) => entity.id === relation.related_entity_id) ?? null;
    }
  });

  return fields;
};
