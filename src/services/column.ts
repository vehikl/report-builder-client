import { Column } from '@src/definitions/Report.ts';
import { Field, Entity } from '@src/definitions/Entity.ts';
import { getRelatedEntity } from '@src/services/field.ts';

export const getColumnFields = (column: Column, entity: Entity, entities: Entity[]): Field[] => {
  if (column.expression.type !== 'field') {
    return [];
  }

  const identifiers = column.expression.value.split('.');

  const attributes: Field[] = [];
  let currentEntity: Entity | null = entity;

  identifiers.forEach((identifier) => {
    const field = currentEntity?.fields.find((field) => field.identifier === identifier);

    if (!field) {
      return;
    }

    attributes.push(field);
    currentEntity = getRelatedEntity(field, entities);
  });

  return attributes;
};

export const isFieldColumn = (column: Column): boolean => column.expression.type === 'field';
