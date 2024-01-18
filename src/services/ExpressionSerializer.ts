import { Expression } from '@src/services/expression.ts';

export class ExpressionSerializer {
  static serialize(expression: Expression | undefined): string {
    if (!expression) {
      return '';
    }

    switch (expression.type) {
      case 'identifier':
        return expression.value;
      case 'number':
        return expression.value.toString();
      case 'attribute':
        return `:${expression.value}`;
      case 'string':
        return `"${expression.value}"`;
      case 'binary':
        return `${ExpressionSerializer.serialize(expression.left)} ${
          expression.op
        } ${ExpressionSerializer.serialize(expression.right)}`;
      case 'call':
        return `${expression.fn}(${expression.args
          .map((arg) => ExpressionSerializer.serialize(arg))
          .join(', ')})`;
    }
  }
}
