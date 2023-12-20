import { Attribute, Field, Relation } from '@src/definitions/Entity.ts';

export const relationMatchesPath =
  (key: string) =>
  (relation: Relation): boolean =>
    relation.path === key || relation.id.toString() === key;

export const getFieldPath = (field: Field): string => field.path ?? field.id.toString();

export const isRelation = (field?: Field): field is Relation => !!field && 'is_collection' in field;

export const isAttribute = (field?: Field): field is Attribute => !isRelation(field);
