import { config } from "dotenv";
import { z } from "zod";

config({ path: new URL("../../.env", import.meta.url), quiet: true });

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url().default("http://localhost:4000"),
  CORS_ORIGIN: z.string().url().default("http://localhost:3000"),
});

const result = schema.safeParse(process.env);
if (!result.success) {
  throw new Error("Invalid API environment: " + result.error.issues.map((issue) => issue.path.join(".") + ": " + issue.message).join("; "));
}
export const env = result.data;

