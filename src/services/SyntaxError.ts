export class SyntaxError extends Error {
  constructor(
    message: string,
    public position: number,
    public length: number,
  ) {
    super(message);
  }
}
