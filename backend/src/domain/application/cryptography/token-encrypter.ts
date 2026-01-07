export abstract class TokenEncrypter {
  abstract generateAccessToken(
    payload: Record<string, unknown>
  ): Promise<string>;
  abstract generateRefreshToken(
    payload: Record<string, unknown>
  ): Promise<string>;
  abstract verifyToken(token: string): Promise<Record<string, unknown> | null>;

  abstract generateIncomingStudentToken(
    payload: Record<string, unknown>
  ): Promise<string>;
  abstract verifyIncomingStudentToken(
    token: string
  ): Promise<Record<string, unknown> | null>;
}
