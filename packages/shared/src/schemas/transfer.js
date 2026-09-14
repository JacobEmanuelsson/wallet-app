import { z } from "zod";

export const createTransferSchema = z.object({
  fromWalletId: z.string().min(1),
  toWalletId: z.string().min(1),
  amount: z.number().int().positive(),
});
