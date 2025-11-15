import z from "zod";
import { STUDENT_TYPE } from "../responses/student.response";

export const registerStudentDtoSchema = z
  .object({
    name: z.string().min(2).max(200),
    email: z.email().max(200),
    password: z.string(),
    passwordConfirmation: z.string(),
    matriculation: z
      .string()
      .min(10, "Deve ter no mínimo 10 caracteres")
      .max(10, "Deve ter no máximo 10 caracteres"),
    type: z.enum(STUDENT_TYPE),
  })
  .refine((schema) => schema.password === schema.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export type RegisterStudentDto = z.infer<typeof registerStudentDtoSchema>;

export const updateStudentDtoSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  matriculation: z.string().min(10).max(10).optional(),
  type: z.enum(STUDENT_TYPE).optional(),
});

export type UpdateStudentDto = z.infer<typeof updateStudentDtoSchema>;
