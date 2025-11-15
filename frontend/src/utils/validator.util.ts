import z from "zod";

export class Validator {
  static validateYear() {
    return z
      .string()
      .nullable()
      .refine((value) => {
        if (!value) {
          return true;
        }

        const year = Number(value);

        if (isNaN(year)) {
          return false;
        }

        if (year < 0) {
          return false;
        }

        if (year > new Date().getFullYear()) {
          return false;
        }

        return true;
      });
  }

  static validateOptionalYear() {
    return z
      .string()
      .optional()
      .refine((value) => {
        if (!value) {
          return true;
        }

        const year = Number(value);

        if (isNaN(year)) {
          return false;
        }

        if (year < 0) {
          return false;
        }

        if (year > new Date().getFullYear()) {
          return false;
        }

        return true;
      });
  }
}
