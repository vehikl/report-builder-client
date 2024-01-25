import { TokenData, Tokenizer, TokenPattern } from '@src/services/Tokenizer.ts';
import { SyntaxError } from '@src/services/SyntaxError.ts';
import {
  Addition,
  Comparison,
  Exponentiation,
  Expression,
  Multiplication,
} from '@src/services/expression.ts';

/*
EXPRESSION
    : COMPARISON
    ;

COMPARISON
    : COMPARISON ('=' | '<' | '>') ADDITION
    | ADDITION
    ;

ADDITION
    : ADDITION ('+' | '-') MULTIPLICATION
    | MULTIPLICATION
    ;

MULTIPLICATION
    : MULTIPLICATION ('*' | '/') EXPONENTIATION
    | EXPONENTIATION
    ;

EXPONENTIATION
    : EXPONENTIATION '^' BASIC
    | BASIC
    ;

BASIC
    : number
    | string
    | identifier
    | CALL
    | FIELD
    | '(' EXPRESSION ')'
    ;

FIELD
    : ':'identifier
    ;

CALL
    : identifier '(' EXPRESSION [',' EXPRESSION]* ')'
    ;
 */

const tokens: TokenPattern[] = [
  [/^\s+/, null],
  [/^-?\d+(?:\.\d+)?\b/, 'NUMBER'],
  [/^[a-zA-Z]\w*/, 'IDENT'],
  [/^:[a-zA-Z]\w*(\.[a-zA-Z]\w*)*/, 'FIELD'],
  [/^"[^"]*"/, 'STRING'],
  [/^\+/, '+'],
  [/^-/, '-'],
  [/^\*/, '*'],
  [/^\^/, '^'],
  [/^>/, '>'],
  [/^</, '<'],
  [/^=/, '='],
  [/^\//, '/'],
  [/^\(/, '('],
  [/^\)/, ')'],
  [/^,/, ','],
];

export class ExpressionParser {
  private lookahead: TokenData | null = null;
  private tokenizer = new Tokenizer(tokens);

  read(string: string): Expression {
    this.tokenizer.read(string);
    this.lookahead = this.tokenizer.next();

    const expression = this.EXPRESSION();

    if (this.lookahead !== null) {
      throw new SyntaxError(
        `Unexpected continuation of input`,
        this.lookahead.position,
        this.lookahead.length,
      );
    }

    return expression;
  }

  eat(tokenType: string, ...tokenTypes: string[]): TokenData {
    const token = this.lookahead;

    if (!token || !this.lookahead) {
      throw new SyntaxError(
        `Unexpected end of input; expected ${tokenType}`,
        this.tokenizer.length - 1,
        1,
      );
    }

    if (![tokenType, ...tokenTypes].includes(this.lookahead.type)) {
      throw new SyntaxError(
        `Expected ${tokenType} === ${token.type}`,
        this.lookahead.position,
        this.lookahead.length,
      );
    }

    this.lookahead = this.tokenizer.next();

    return token;
  }

  private is(...tokenTypes: string[]): boolean {
    return !!this.lookahead && tokenTypes.includes(this.lookahead.type);
  }

  private EXPRESSION(): Expression {
    return this.COMPARISON();
  }

  private COMPARISON(): Expression {
    let left = this.ADDITION();

    while (this.is('=', '<', '>')) {
      const op = this.eat('=', '<', '>');
      const right = this.ADDITION();
      left = {
        type: 'binary',
        op: op.token as Comparison['op'],
        left,
        right,
        position: left.position,
        length: right.position - left.position + right.length,
      };
    }

    return left;
  }

  private ADDITION(): Expression {
    let left = this.MULTIPLICATION();

    while (this.is('+', '-')) {
      const op = this.eat('+', '-');
      const right = this.MULTIPLICATION();
      left = {
        type: 'binary',
        op: op.token as Addition['op'],
        left,
        right,
        position: left.position,
        length: right.position - left.position + right.length,
      };
    }

    return left;
  }

  private MULTIPLICATION(): Expression {
    let left = this.EXPONENTIATION();

    while (this.is('*', '/')) {
      const op = this.eat('*', '/');
      const right = this.EXPONENTIATION();
      left = {
        type: 'binary',
        op: op.token as Multiplication['op'],
        left,
        right,
        position: left.position,
        length: right.position - left.position + right.length,
      };
    }

    return left;
  }

  private EXPONENTIATION(): Expression {
    let left = this.BASIC();

    while (this.is('^')) {
      const op = this.eat('^');
      const right = this.BASIC();
      left = {
        type: 'binary',
        op: op.token as Exponentiation['op'],
        left,
        right,
        position: left.position,
        length: right.position - left.position + right.length,
      };
    }

    return left;
  }

  private BASIC(): Expression {
    if (this.is('(')) {
      this.eat('(');
      const expr = this.EXPRESSION();
      this.eat(')');

      return expr;
    }

    if (this.is('FIELD')) {
      const { token, position, length } = this.eat('FIELD');

      return { type: 'field', value: token.slice(1), position, length };
    }

    if (this.is('IDENT')) {
      const identifier = this.eat('IDENT');

      if (this.is('(')) {
        return this.CALL(identifier);
      }

      return {
        type: 'identifier',
        value: identifier.token,
        position: identifier.position,
        length: identifier.length,
      };
    }

    if (this.is('NUMBER')) {
      const { token, position, length } = this.eat('NUMBER');
      return { type: 'number', value: token, position, length };
    }

    if (this.is('STRING')) {
      const { token, position, length } = this.eat('STRING');
      return { type: 'string', value: token.slice(1, -1), position, length };
    }

    throw new SyntaxError(
      `Malformed expression.`,
      this.lookahead?.position ?? 0,
      this.lookahead?.length ?? this.tokenizer.length,
    );
  }

  private CALL(identifier: TokenData): Expression {
    this.eat('(');
    const args = [this.EXPRESSION()];

    while (this.is(',')) {
      this.eat(',');
      args.push(this.EXPRESSION());
    }

    const end = this.eat(')');
    return {
      type: 'call',
      fn: identifier.token,
      args,
      position: identifier.position,
      length: end.position - identifier.position + end.length,
    };
  }
}
