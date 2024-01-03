export type Entity = {
  id: number;
  table: string;
  name: string;
  created_at: string;
  updated_at: string;
  attributes: Attribute[];
};

export type Attribute = {
  id: number;
  identifier: string;
  entity_id: number;
  path: string;
  name: string;
  type: AttributeType;
  created_at: string;
  updated_at: string;
};

export type BasicAttributeType = {
  name: 'string' | 'number' | 'boolean';
};

export type CompositeAttributeType = {
  name: 'entity' | 'collection';
  entityId: number;
};

export type AttributeType = BasicAttributeType | CompositeAttributeType;
