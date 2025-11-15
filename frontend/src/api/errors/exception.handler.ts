import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { ApiResponseError } from "./apiResponse.error";

export interface ErrorConfig {
  message?: string;
  statusCode?: number;
  fallbackMessage?: string;
}

export interface ExceptionHandlerOptions {
  error: unknown;
  errorMap?: Record<string | number, string>;
  fallbackMessage?: string;
  onError?: (handledError: HandledError) => void;
  throwOnUnknown?: boolean;
}

export interface HandledError {
  message: string;
  statusCode: number;
  originalError: unknown;
}

const UNKWNOW_ERROR_MESSAGE = "Ocorreu um erro inesperado";

export class ExceptionHandler {
  private static getErrorInfo(error: unknown): {
    message: string;
    statusCode: number;
  } {
    if (error instanceof ApiResponseError) {
      return {
        message: error.message || "Unknown API error occurred",
        statusCode: error.statusCode || HTTP_STATUS.internal,
      };
    }

    if (error instanceof Error) {
      return {
        message: "Unknown error occurred",
        statusCode: HTTP_STATUS.internal,
      };
    }

    return {
      message: "Unknown error occurred",
      statusCode: HTTP_STATUS.internal,
    };
  }

  private static findErrorMessage(
    fallbackMessage: string,
    errorInfo: { message: string; statusCode: number },
    errorMap?: Record<string | number, string>
  ): string | null {
    if (!errorMap) return null;

    if (errorInfo.statusCode === HTTP_STATUS.internal) {
      return fallbackMessage;
    }

    if (errorMap[errorInfo.statusCode]) {
      return errorMap[errorInfo.statusCode];
    }

    if (errorMap[errorInfo.message]) {
      return errorMap[errorInfo.message];
    }

    return null;
  }

  static handle({
    error,
    errorMap,
    onError,
    fallbackMessage = UNKWNOW_ERROR_MESSAGE,
    throwOnUnknown = false,
  }: ExceptionHandlerOptions): HandledError {
    const errorInfo = this.getErrorInfo(error);
    const mappedMessage = this.findErrorMessage(
      fallbackMessage,
      errorInfo,
      errorMap
    );
    const finalMessage = mappedMessage || fallbackMessage;

    const result: HandledError = {
      message: finalMessage,
      statusCode: errorInfo.statusCode,
      originalError: error,
    };

    onError?.(result);

    if (throwOnUnknown && !mappedMessage) {
      throw error;
    }

    return result;
  }
}
