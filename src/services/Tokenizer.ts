import { SyntaxError } from '@src/services/SyntaxError.ts';

export type TokenPattern = [RegExp, string | null];

export type TokenData = {
  token: string;
  type: string;
  position: number;
  length: number;
};

export class Tokenizer {
  private cursor = 0;
  private data = '';

  constructor(private tokens: TokenPattern[]) {}

  get length(): number {
    return this.data.length;
  }

  read(data: string): void {
    this.cursor = 0;
    this.data = data;
  }

  next(): TokenData | null {
    // If at end of input, not more tokens to generate
    if (this.cursor === this.data.length) {
      return null;
    }

    // Find substring beginning at position of cursor
    const str = this.data.slice(this.cursor);

    for (const [pattern, type] of this.tokens) {
      const [match] = pattern.exec(str) || [];

      if (!match) {
        continue;
      }

      this.cursor += match.length;

      // Skip tokens with null types
      if (type === null) {
        return this.next();
      }

      return {
        token: match,
        type,
        position: this.cursor - match.length,
        length: match.length,
      };
    }

    throw new SyntaxError(`Unrecognized input: ${str[0]}`, this.cursor, 1);
  }
}
