export type Entity = {
  id: number;
  table: string;
  name: string;
  created_at: string;
  updated_at: string;
  fields: Field[];
};

export type Field = {
  id: number;
  identifier: string;
  entity_id: number;
  path: string;
  name: string;
  type: FieldType;
  created_at: string;
  updated_at: string;
};

export type BasicFieldType = {
  name: 'string' | 'number' | 'boolean';
};

export type CompositeFieldType = {
  name: 'entity' | 'collection';
  entityId: number;
};

export type FieldType = BasicFieldType | CompositeFieldType;
