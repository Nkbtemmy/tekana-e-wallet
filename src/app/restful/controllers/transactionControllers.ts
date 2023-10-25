import { Response } from "express";

import TransactionService from "../../services/transactionService";
import AccountService from "../../services/accountService";
import WalletService from "../../services/walletService";
import { paginate } from "../../utils/pagination";

export default class TransactionControllers {
	static async deposit(req: any, res: Response) {
		try {
			const { id: customerId } = req.user;
			const { accountId, amount } = req.body;

			if (!accountId || isNaN(amount) || amount <= 0) {
				return res.status(400).json({
					message: "Invalid input data",
				});
			}

			await WalletService.updateAccountAndWalletBalance(accountId,"+", amount)

			const transactionData = {
				customerId,
				accountId,
				transactionType: "DEPOSIT",
				amount,
				description: req.body.description || null,
			};

			const createdTransaction =
				await TransactionService.create(transactionData);

			return res.status(201).json({
				message: "Transaction created successfully",
				data: createdTransaction,
			});
		} catch (error: any) {
			return res.status(500).json({
				message: "Server error",
				error: error.message,
			});
		}
	}

	static async withdrawal(req: any, res: Response) {
		try {
			const { id: customerId } = req.user;
			const { accountId, amount } = req.body;

			if (!accountId || isNaN(amount) || amount <= 0) {
				return res.status(400).json({
					message: "Invalid input data",
				});
			}

			await WalletService.updateAccountAndWalletBalance(accountId,"-", amount)

			const transactionData = {
				customerId,
				accountId,
				transactionType: "WITHDRAWAL",
				amount,
				description: req.body.description || null,
			};

			const createdTransaction =
				await TransactionService.create(transactionData);

			return res.status(201).json({
				message: "Transaction created successfully",
				data: createdTransaction,
			});
		} catch (error: any) {
			return res.status(500).json({
				message: "Server error",
				error: error.message,
			});
		}
	}

	static async transfer(req: any, res: Response) {
		try {
			const { id: customerId } = req.user;
			const { accountId, amount, toAccountId } = req.body;

			const customerWalletId =
				await WalletService.getWalletIdByCustomerId(customerId);

			if (!accountId || isNaN(amount) || amount <= 0 || !toAccountId) {
				return res.status(400).json({
					message: "Invalid input data",
				});
			}

			const myAccountExist = await AccountService.findOne({
				id: accountId,
				walletId: customerWalletId,
			});
			const accountExist = await AccountService.findByPk(toAccountId);

			if (!myAccountExist) {
				return res.status(403).json({
					message: "You don't own the account you trying to transfer from",
				});
			}
			if (!accountExist) {
				return res.status(404).json({
					message: "Account you want to transfer on doesn't exist",
				});
			}
			// removing money from my account
			await WalletService.updateAccountAndWalletBalance(accountId,"-", amount);
			// add money to receiver account 
			await WalletService.updateAccountAndWalletBalance(toAccountId,"+", amount);

			const transactionData = {
				customerId,
				accountId,
				transactionType: "TRANSFER",
				amount,
				toAccountId,
				description: req.body.description || null,
			};

			const createdTransaction =
				await TransactionService.create(transactionData);

			return res.status(201).json({
				message: "Transaction created successfully",
				data: createdTransaction,
			});
		} catch (error: any) {
			return res.status(500).json({
				message: "Server error",
				error: error.message,
			});
		}
	}

	static async getAllMyTransactionsType(req: Request | any, res: Response) {
		try {
			let { page, limit } = req.query;
			let { transactionType } = req.params;
			console.log("transaction type", req.params)
			const { id: customerId } = req.user;
			const allowedTransactionTypes: string[] = [
				"DEPOSIT",
				"WITHDRAWAL",
				"TRANSFER",
			];

			transactionType = transactionType
				? transactionType.toUpperCase()
				: undefined;
			page = page ? Number(page) : undefined;
			limit = limit ? Number(limit) : undefined;

			if (
				transactionType &&
				!allowedTransactionTypes.includes(transactionType)
			) {
				return res.status(404).json({
					message: "Incorrect transaction type",
				});
			}

			const offset: number | undefined =
				page && limit ? (page - 1) * limit : undefined;
			const whereClause: Record<string, any> = { customerId };

			if (transactionType) {
				whereClause.transactionType = transactionType;
			}

			
			const { rows, count } = await TransactionService.findAllAndCount({
				limit,
				offset,
				where: whereClause,
			});

			const pagination = paginate(page, count, rows, limit);

			return res.status(200).json({
				message: "Transactions retrieved successfully",
				data: { rows, count },
				pagination,
			});
		} catch (error: any) {
			return res.status(500).json({
				message: "Server error",
				error: error.message,
			});
		}
	}

	static async getOne(req: any, res: Response) {
		try {
			const { id } = req.params;
			const transaction = await TransactionService.findByPk(id);
			if (!transaction) {
				return res.status(404).json({
					message: "transaction not found",
				});
			}
			return res.status(200).json({
				message: "transaction retreived successfully",
				data: transaction,
			});
		} catch (error: any) {
			return res.status(500).json({
				message: "server error",
				error: error.message,
			});
		}
	}

	static async getAccountTransactions(req: any, res: Response) {
		try {
			const { id } = req.params;
			const transactions = await TransactionService.findAllAndCount({
				accountId:id
			});
			if (!transactions) {
				return res.status(404).json({
					message: "transactions not found",
				});
			}
			return res.status(200).json({
				message: "transactions retreived successfully",
				data: transactions,
			});
		} catch (error: any) {
			return res.status(500).json({
				message: "server error",
				error: error.message,
			});
		}
	}
}
