import express from "express";
import TransactionControllers from "../controllers/transactionControllers";
import { isLoggedIn } from "../middlewares/authMiddleware";
import { balanceChecker } from "../middlewares/transactionMiddleware";

const router = express();

router
	.get("/", isLoggedIn, TransactionControllers.getAllMyTransactionsType)
	.post("/deposit", isLoggedIn, TransactionControllers.deposit)
	.post("/withdrawal", isLoggedIn,balanceChecker, TransactionControllers.withdrawal)
	.post("/transfer", isLoggedIn,balanceChecker, TransactionControllers.transfer)
	.get("/:transactionType", isLoggedIn, TransactionControllers.getAllMyTransactionsType)
	.get("/single/:id", TransactionControllers.getOne)
	.get("/accounts/:id", TransactionControllers.getAccountTransactions);

export default router;
