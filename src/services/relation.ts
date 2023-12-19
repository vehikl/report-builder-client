import { Relation } from '@src/definitions/Entity.ts';

export const relationMatchesPath =
  (key: string) =>
  (relation: Relation): boolean =>
    relation.path === key || relation.id.toString() === key;

export const getRelationPath = (relation: Relation): string =>
  relation.path ?? relation.id.toString();
