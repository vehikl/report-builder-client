import { Expression } from '@src/services/expression.ts';

export type Format = 'General' | 'YesNo' | 'NumberZeroDecimal' | 'NumberTwoDecimals';

export type CellValue = string | number | boolean | null | undefined;

export type Report = {
  id: number;
  name: string;
  entity_id: string;
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
  format: Format;
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

export type ReportRecord = Record<string, CellValue>;

export type ReportPreview = {
  name: string;
  entity_id: string;
  columns: Column[];
  records: Paginated<ReportRecord>;
  sort: Sort | null;
};
