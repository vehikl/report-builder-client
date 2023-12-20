export type Entity = {
  id: number;
  table: string;
  name: string;
  created_at: string;
  updated_at: string;
  attributes: Attribute[];
  relations: Relation[];
};

export type Attribute = {
  id: number;
  entity_id: number;
  path: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Relation = {
  id: number;
  path: string | null;
  entity_id: number;
  name: string;
  related_entity_id: number;
  is_collection: boolean;
  created_at: string;
  updated_at: string;
};

export type Field = Attribute | Relation;
