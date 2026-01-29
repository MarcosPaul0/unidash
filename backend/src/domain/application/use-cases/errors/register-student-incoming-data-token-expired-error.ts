import { UseCaseError } from "@/core/errors/use-case-error";

export class RegisterStudentIncomingDataTokenExpiredError
  extends Error
  implements UseCaseError
{
  constructor() {
    super(`Register student incoming data token is expired`);
  }
}
