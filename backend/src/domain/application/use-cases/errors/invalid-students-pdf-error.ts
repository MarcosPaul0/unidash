import { UseCaseError } from "@/core/errors/use-case-error";

export class InvalidStudentPdfError extends Error implements UseCaseError {
  constructor() {
    super(`Invalid students PDF.`);
  }
}
