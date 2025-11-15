import { z } from "zod";
export const registerTeacherDtoSchema = z
  .object({
    name: z.string().min(2).max(200),
    email: z.email(),
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .refine((schema) => schema.password === schema.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export type RegisterTeacherDto = z.infer<typeof registerTeacherDtoSchema>;

export const updateTeacherDtoSchema = z.object({
  name: z.string().min(2).max(200),
  isActive: z.boolean(),
});

export type UpdateTeacherDto = z.infer<typeof updateTeacherDtoSchema>;

export const filterTeachersDtoSchema = z
  .object({
    name: z.string().min(2).max(200).optional(),
    email: z.string().min(2).max(200).optional(),
    isActive: z.boolean().optional(),
  })
  .optional();

export type FilterTeachersDto = z.infer<typeof filterTeachersDtoSchema>;

export const findTeacherDtoSchema = z.object({
  nameOrEmail: z.string().min(2).max(200),
});

export type FindTeacherDto = z.infer<typeof findTeacherDtoSchema>;
