import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { env } from "./lib/env.js";
import walletRoutes from "./routes/wallet.routes.js";

export const app = express();
app.use(cors({ origin: new URL(env.CORS_ORIGIN).origin, credentials: true }));
// Mount Better Auth before any JSON body parser.
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/wallet", walletRoutes);