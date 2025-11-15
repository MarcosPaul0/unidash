import { z } from "zod";

export const authDtoSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type AuthDto = z.infer<typeof authDtoSchema>;
