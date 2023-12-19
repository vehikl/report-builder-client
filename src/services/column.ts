import { Column, Field } from '@src/definitions/Report.ts';
import { Entity } from '@src/definitions/Entity.ts';

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

    const relation = currentEntity?.relations.find((relation) => relation.path === path);

    if (relation) {
      fields.push({
        key: relation.path,
        name: relation.name,
      });
      currentEntity = entities.find((entity) => entity.id === relation.related_entity_id) ?? null;
    }
  });

  return fields;
};
// export const getColumnFields2 = (column: Column, entity: Entity, entities: Entity[]): Field[] => {
//   const fields: Field[] = [];
//   let currentExpression = column.expression;
//   let currentEntity = entity;
//
//   while (currentExpression.length) {
//     const attribute = currentEntity.attributes.find(
//       (attribute) => currentExpression === attribute.path,
//     );
//
//     if (attribute) {
//       fields.push({
//         key: attribute.path,
//         name: attribute.name,
//       });
//
//       break;
//     }
//
//     const relation = currentEntity.relations.find((relation) =>
//       currentExpression.startsWith(`${relation.path}.`),
//     );
//
//     if (relation) {
//       fields.push({
//         key: relation.path,
//         name: relation.name,
//       });
//
//       currentExpression = currentExpression.slice(`${relation.path}.`.length);
//       const nextEntity = entities.find((entity) => entity.table === relation.related_entity_id);
//       if (!nextEntity) {
//         break;
//       }
//       currentEntity = nextEntity;
//
//       continue;
//     }
//
//     break;
//   }
//
//   return fields;
// };
