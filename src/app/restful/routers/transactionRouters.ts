import express from "express";
import TransactionControllers from "../controllers/transactionControllers";
import { isLoggedIn } from "../middlewares/authMiddleware";

const router = express();

router
	.get("/", isLoggedIn, TransactionControllers.getAllMyTransactionsType)
	.post("/deposit", isLoggedIn, TransactionControllers.deposit)
	.get("/:deposit", isLoggedIn, TransactionControllers.getAllMyTransactionsType)
	.post("/withdrawal", isLoggedIn, TransactionControllers.withdrawal)
	.get(
		"/:withdrawal",
		isLoggedIn,
		TransactionControllers.getAllMyTransactionsType,
	)
	.post("/transfer", isLoggedIn, TransactionControllers.transfer)
	.get(
		"/:transfer",
		isLoggedIn,
		TransactionControllers.getAllMyTransactionsType,
	)
	.get("/single/:id", TransactionControllers.getOne);

export default router;
