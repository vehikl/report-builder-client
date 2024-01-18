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

export type Basic = {
  type: 'number' | 'identifier' | 'attribute' | 'string';
  value: string;
  position: number;
  length: number;
};

export type Expression = Comparison | Addition | Multiplication | Exponentiation | Call | Basic;
export type BinaryExpression = Comparison | Addition | Multiplication | Exponentiation;
