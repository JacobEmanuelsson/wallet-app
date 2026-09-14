import { Router } from "express";
import { getWallet } from "../controllers/wallet.controller.js";

const router = Router();

router.get("/", getWallet);

export default router;