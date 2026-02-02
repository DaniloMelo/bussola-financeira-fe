export class ApiRequestError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}
