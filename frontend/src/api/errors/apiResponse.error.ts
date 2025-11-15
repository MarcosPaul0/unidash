import { HttpStatus } from "@unidash/lib/baseApiClient";

export class ApiResponseError extends Error {
  public error: string;
  public statusCode: HttpStatus;
  public endpoint: string;

  constructor(
    message: string,
    error: string,
    statusCode: HttpStatus,
    endpoint: string
  ) {
    super(message);

    this.error = error;
    this.statusCode = statusCode;
    this.endpoint = endpoint;
  }
}
