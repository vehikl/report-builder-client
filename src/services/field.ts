import { Attribute, Field, Relation } from '@src/definitions/Entity.ts';

export const getExpressionFromFields = (fields: Field[]): string =>
  fields.map((field) => `${field.id}:${field.path ?? ''}`).join(',');

export const isRelation = (field?: Field): field is Relation => !!field && 'is_collection' in field;

export const isAttribute = (field?: Field): field is Attribute => !isRelation(field);
