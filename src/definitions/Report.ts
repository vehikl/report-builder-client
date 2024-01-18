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
  expression: Expression;
};

export type ReportPreview = {
  name: string;
  entity_id: number;
  columns: Column[];
  records: Record<string, string | number | boolean | null | undefined>[];
};
