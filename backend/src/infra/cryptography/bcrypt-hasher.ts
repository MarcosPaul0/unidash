import { Hasher } from "@/domain/application/cryptography/hasher";
import { hash, compare } from "bcryptjs";
import { randomBytes } from "node:crypto";

export class BcryptHasher implements Hasher {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }

  generatePassword(): string {
    return randomBytes(12).toString("base64").slice(0, 12);
  }
}
