import { z } from "zod";

const environmentSchema = z.object({
  ITEMS_PER_PAGE: z.string().transform(Number),
});

export const environment = environmentSchema.parse(process.env);
