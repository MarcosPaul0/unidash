import z from "zod";

export const registerCourseDtoSchema = z.object({
  name: z.string().min(2).max(200),
});

export type RegisterCourseDto = z.infer<typeof registerCourseDtoSchema>;

export const updateCourseDtoSchema = z.object({
  name: z.string().min(2).max(200),
});

export type UpdateCourseDto = z.infer<typeof updateCourseDtoSchema>;

export const filterCoursesDtoSchema = z
  .object({
    name: z.string().min(2).max(200).optional(),
  })
  .optional();

export type FilterCoursesDto = z.infer<typeof filterCoursesDtoSchema>;
