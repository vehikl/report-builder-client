import { Field, Entity } from '@src/definitions/Entity.ts';
import { Expression } from '@src/services/expression.ts';

export const makeExpressionFromFields = (attributes: Field[]): Expression => ({
  type: 'field',
  value: attributes.map((field) => field.identifier).join('.'),
  position: 0,
  length: 1,
});

export const getRelatedEntity = ({ type }: Field, entities: Entity[]): Entity | null => {
  if (type.name !== 'entity') {
    return null;
  }
  return entities.find((entity) => entity.id === type.entityId) ?? null;
};

export const isBasicField = ({ type }: Field): boolean =>
  ['string', 'number', 'boolean'].includes(type.name);

export const isEntityField = ({ type }: Field): boolean => type.name === 'entity';

export const isCollectionField = ({ type }: Field): boolean => type.name === 'collection';
