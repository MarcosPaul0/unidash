import { z } from "zod";

export const envSchema = z.object({
  DB_URL: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_ACCESS_TOKEN_EXPIRATION_SECONDS: z.coerce.number(),
  JWT_INCOMING_STUDENT_EXPIRATION_DAYS: z.coerce.number(),
  JWT_REFRESH_TOKEN_EXPIRATION_DAYS: z.coerce.number(),
  SMTP_HOST: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
  SMTP_PORT: z.coerce.number(),
  FRONTEND_BASE_URL: z.string().refine(
    (val) => {
      const urls = val.split(',').map(url => url.trim());
      return urls.every(url => z.string().url().safeParse(url).success);
    },
    { message: 'Must be a valid URL or comma-separated list of URLs' }
  ),
  ACCOUNT_ACTIVATION_URL: z.string(),
  PASSWORD_RESET_URL: z.string(),
  INCOMING_STUDENT_URL: z.string(),
  REFRESH_TOKEN_COOKIE: z.string(),
});

export type Env = z.infer<typeof envSchema>;
