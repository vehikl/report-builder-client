export type Comparison = {
  type: 'binary';
  op: '=' | '<' | '>';
  left: Expression;
  right: Expression;
  position: number;
  length: number;
};

export type Addition = {
  type: 'binary';
  op: '+' | '-';
  left: Expression;
  right: Expression;
  position: number;
  length: number;
};

export type Multiplication = {
  type: 'binary';
  op: '*' | '/';
  left: Expression;
  right: Expression;
  position: number;
  length: number;
};

export type Exponentiation = {
  type: 'binary';
  op: '^';
  left: Expression;
  right: Expression;
  position: number;
  length: number;
};

export type Call = {
  type: 'call';
  fn: string;
  args: Expression[];
  position: number;
  length: number;
};

export type Group = {
  type: 'group';
  expression: Expression;
  position: number;
  length: number;
};

export type Basic = {
  type: 'number' | 'identifier' | 'field' | 'string';
  value: string;
  position: number;
  length: number;
};

export type Expression =
  | Comparison
  | Addition
  | Multiplication
  | Exponentiation
  | Call
  | Group
  | Basic;
