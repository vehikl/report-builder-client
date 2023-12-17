export type Report = {
  id: number;
  name: string;
  columns: Column[];
};

export type Column = {
  name: string;
  expression: string;
};

export type ReportPreview = {
  name: string;
  columns: Column[];
  records: Record<string, string | number | boolean | null | undefined>[];
};

export type Field = {
  name: string;
  key: string;
};
