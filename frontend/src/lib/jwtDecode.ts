import { UserRole } from "@unidash/api/responses/admin.response";
import { jwtDecode } from "jwt-decode";

interface JwtDecoded {
  sub: string;
  userRole: UserRole;
  iat: number;
  exp: number;
}

export class JwtDecode {
  public static decode(token?: string): JwtDecoded | null {
    if (!token) {
      return null;
    }

    return jwtDecode(token) as JwtDecoded;
  }
}
