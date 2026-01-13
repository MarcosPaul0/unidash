import z from "zod";

export const recoverPasswordDtoSchema = z
  .object({
    newPassword: z.string().min(10),
    passwordConfirmation: z.string(),
  })
  .refine((schema) => schema.newPassword === schema.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export type RecoverPasswordDto = z.infer<typeof recoverPasswordDtoSchema>;
