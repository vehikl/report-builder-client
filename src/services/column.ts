import { Column } from '@src/definitions/Report.ts';
import { Attribute, Entity } from '@src/definitions/Entity.ts';
import { getRelatedEntity } from '@src/services/attribute.ts';

export const getColumnAttributes = (
  column: Column,
  entity: Entity,
  entities: Entity[],
): Attribute[] => {
  const identifiers = column.expression.replace(/^:/, '').split('.');

  const attributes: Attribute[] = [];
  let currentEntity: Entity | null = entity;

  identifiers.forEach((identifier) => {
    const attribute = currentEntity?.attributes.find(
      (attribute) => attribute.identifier === identifier,
    );

    if (!attribute) {
      return;
    }

    attributes.push(attribute);
    currentEntity = getRelatedEntity(attribute, entities);
  });

  return attributes;
};

export const isAttributeColumn = (column: Column): boolean =>
  /^:[a-zA-Z]+(\.[a-zA-Z]+)*/.test(column.expression);
