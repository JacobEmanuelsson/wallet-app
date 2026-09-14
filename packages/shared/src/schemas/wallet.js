import { z } from "zod";

export const createWalletSchema = z.object({
  userId: z.string().min(1),
});
