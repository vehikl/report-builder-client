import { Attribute, Entity } from '@src/definitions/Entity.ts';

export const makeExpressionFromAttributes = (attributes: Attribute[]): string =>
  attributes.map((attribute) => `${attribute.id}:${attribute.path ?? ''}`).join(',');

export const getRelatedEntity = (attribute: Attribute, entities: Entity[]): Entity | null => {
  const [, , entityId] = attribute.type.match(/^(entity|collection):(\d+)$/) ?? [];

  if (!entityId) {
    return null;
  }

  return entities.find((entity) => entity.id.toString() === entityId) ?? null;
};

export const isBasicAttribute = (attribute: Attribute): boolean =>
  ['string', 'number', 'boolean'].includes(attribute.type);

export const isEntityAttribute = (attribute: Attribute): boolean =>
  /^entity:\d+$/.test(attribute.type);

export const isCollectionAttribute = (attribute: Attribute): boolean =>
  /^collection:\d+$/.test(attribute.type);
