import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EnvService } from "../env/env.service";
import { TokenEncrypter } from "@/domain/application/cryptography/token-encrypter";

@Injectable()
export class JwtEncrypter implements TokenEncrypter {
  constructor(
    private jwtService: JwtService,
    private envService: EnvService
  ) {}

  generateAccessToken(payload: Record<string, unknown>): Promise<string> {
    const expiresIn = this.envService.get(
      "JWT_ACCESS_TOKEN_EXPIRATION_SECONDS"
    );
    return this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }

  generateRefreshToken(payload: Record<string, unknown>): Promise<string> {
    const expiresIn =
      `${this.envService.get("JWT_REFRESH_TOKEN_EXPIRATION_DAYS")}d` as unknown as number;
    return this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }

  async verifyToken(token: string) {
    try {
      const { sub, userRole, accountActivatedAt } =
        await this.jwtService.verifyAsync(token);

      return { sub, userRole, accountActivatedAt };
    } catch {
      return null;
    }
  }

  // TODO criar entidade para token de ingressante
  generateIncomingStudentToken(
    payload: Record<string, unknown>
  ): Promise<string> {
    const expiresIn =
      `${this.envService.get("JWT_INCOMING_STUDENT_EXPIRATION_DAYS")}d` as unknown as number;

    return this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }

  async verifyIncomingStudentToken(token: string) {
    try {
      const { sub } = await this.jwtService.verifyAsync(token);

      return { sub };
    } catch {
      return null;
    }
  }
}
