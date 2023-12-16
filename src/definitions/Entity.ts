export type Entity = {
  table: string;
  created_at: string;
  updated_at: string;
  name: string;
  attributes: Attribute[];
  relations: Relation[];
};

export type Attribute = {
  id: number;
  entity_table: string;
  column: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Relation = {
  id: number;
  accessor: string;
  entity_table: string;
  related_entity_table: string;
  name: string;
  is_collection: boolean;
  created_at: string;
  updated_at: string;
};

export type Field = {
  path: string;
  name: string;
};

export type ColumnCreationData = {
  name: string;
  fields: Field[];
};

export type ReportColumn = {
  name: string;
  expression: string;
};

export type CreateReportData = {
  name: string;
  columns: ReportColumn[];
};

export type ReportVisualization = {
  name: string;
  headers: string[];
  records: Record<string, string | number | boolean | null | undefined>[];
};
