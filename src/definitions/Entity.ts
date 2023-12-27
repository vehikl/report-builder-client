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
  entity_id: number;
  path: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
};
