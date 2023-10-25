import DB from "../database/models";

const { Wallet, Customer, Account } = DB;
import AccountService from "./accountService";

export default class WalletService {
	static async create(data: object) {
		return Wallet.create(data);
	}

	static async findOne(condition: object) {
		return await Wallet.findOne({
			where: condition,
		});
	}

	static async findAllAndCount(condition: object) {
		return await Wallet.findAndCountAll({
			where: condition,
			include: [
				{
					model: Customer,
					attributes: ["firstName", "lastName", "email"],
				},
				{
					model: Account,
					exclude: ["customerId", "createdAt"],
				},
			],
		});
	}

	static async getAll() {
		return Wallet.findAll();
	}

	static async findByPk(id: string) {
		return Wallet.findByPk(id);
	}

	static async delete(id: string) {
		return Wallet.destroy(id);
	}

	static async update(id: string, data: Record<string, any>) {
		await Wallet.update(data, {
			where: {
				id,
			},
		});
	}

	static async getWalletIdByCustomerId(customerId: string) {
		const customer = await Customer.findByPk(customerId);
		if (!customer) {
			throw new Error("Customer not found");
		}

		const wallet = await Wallet.findOne({
			where: { customerId: customer.id },
		});

		if (!wallet) {
			throw new Error("Wallet not found for this customer");
		}

		return wallet.id;
	}

	static async findWalletByAccountId(accountId:string) {
		try {
			const account = await Account.findByPk(accountId, { include: Wallet });
			if (account) {
			  	const wallet = account.Wallet;
			 	return wallet;
			} else {
				throw new Error('Account not found')
			}
		  } catch (error) {
				throw new Error('Error finding account and wallet')
		  }
	  }

	static async updateAccountAndWalletBalance(accountId:string, operation: string, amount: any) {
		try {
		  const account = await AccountService.findByPk(accountId);
		  if (!account) {
			throw new Error('Account not found');
		  }
			let accountBalanceAsNumber = parseFloat(account.balance);
			const convertedAmount = parseFloat(amount);
		  if (operation === '+') {
			accountBalanceAsNumber += convertedAmount;
		  } else if (operation === '-') {
			accountBalanceAsNumber -= convertedAmount;
		  } else {
			throw new Error('Invalid operation. Use "+" or "-"');
		  }
		  await AccountService.update(accountId, { balance: accountBalanceAsNumber });
		  const wallet = await WalletService.findWalletByAccountId(accountId);
		  if (!wallet) {
			throw new Error('Wallet not found for the account');
		  }
		  let walletBalanceAsNumber = parseFloat(wallet.walletBalance);
		  if (operation === '+') {
			walletBalanceAsNumber += convertedAmount;
		  } else if (operation === '-') {
			walletBalanceAsNumber -= convertedAmount;
		  }
		 	return await WalletService.update(wallet.id, { walletBalance: walletBalanceAsNumber });
		} catch (error) {
		  throw new Error("Error updating balances");
		}
	  }
}
