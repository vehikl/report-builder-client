import { Attribute, Entity } from '@src/definitions/Entity.ts';

export const makeExpressionFromAttributes = (attributes: Attribute[]): string =>
  ':' + attributes.map((attribute) => attribute.identifier).join('.');

export const getRelatedEntity = ({ type }: Attribute, entities: Entity[]): Entity | null => {
  if (type.name !== 'entity') {
    return null;
  }
  return entities.find((entity) => entity.id === type.entityId) ?? null;
};

export const isBasicAttribute = ({ type }: Attribute): boolean =>
  ['string', 'number', 'boolean'].includes(type.name);

export const isEntityAttribute = ({ type }: Attribute): boolean => type.name === 'entity';

export const isCollectionAttribute = ({ type }: Attribute): boolean => type.name === 'collection';
