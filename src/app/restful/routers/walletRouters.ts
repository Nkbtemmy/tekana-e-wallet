import express from "express";
import WalletControllers from "../controllers/walletControllers";
import { isLoggedIn } from "../middlewares/authMiddleware";

const router = express();

router
	.post("/", isLoggedIn, WalletControllers.create)
	.get("/", isLoggedIn, WalletControllers.getAll)
	.get("/:id", WalletControllers.getOne)
	.put("/:id", WalletControllers.update)
	.delete("/:id", WalletControllers.create);

export default router;
