import { Expression } from '@src/services/expression.ts';

export type Report = {
  id: number;
  name: string;
  entity_id: number;
  columns: Column[];
};

// export type Column = {
//   id: number;
//   name: string;
//   expression: string;
//   created_at: string;
//   updated_at: string;
// };

// TODO: ColumnPreview
export type Column = {
  name: string;
  key: string;
  expression: Expression;
};

export type Paginated<T = unknown> = {
  data: T[];
  current_page: number;
  per_page: number;
  from: number;
  to: number;
  total: number;
  last_page: number;
};

export type Sort = {
  key: string;
  direction: 'asc' | 'desc';
};

export type ReportRecord = Record<string, string | number | boolean | null | undefined>;

export type ReportPreview = {
  name: string;
  entity_id: number;
  columns: Column[];
  records: Paginated<ReportRecord>;
  sort: Sort | null;
};
