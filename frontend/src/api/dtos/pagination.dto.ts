import { z } from "zod";

export const paginationDtoSchema = z
  .object({
    page: z.coerce.number().optional(),
    itemsPerPage: z.coerce.number().optional(),
  })
  .optional();

export type PaginationDto = z.infer<typeof paginationDtoSchema>;
