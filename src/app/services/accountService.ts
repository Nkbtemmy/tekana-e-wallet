import DB from "../database/models";

const { Account, Customer, Wallet } = DB;

export default class AccountService {
	static async create(data: object) {
		return Account.create(data);
	}

	static async findOne(condition: object) {
		return await Account.findOne({
			where: condition,
		});
	}

	static async getAll() {
		return Account.findAll();
	}

	static async findByPk(id: string) {
		return Account.findByPk(id, {
			include: [
				{
					model: Wallet,
					attributes: ["walletBalance"],
					include: [
						{
							model: Customer,
							attributes: ["firstName", "lastName", "email"],
						},
					],
				},
			],
		});
	}

	static async delete(id: string) {
		return Account.destroy(id);
	}

	static async update(id: string, data: Record<string, any>) {
		await Account.update(data, {
			where: {
				id,
			},
		});
	}

	static async findAllAndCount(condition: object) {
		return await Account.findAndCountAll({
			where: condition,
			include: [
				{
					model: Wallet,
					attributes: ["walletBalance"],
					include: [
						{
							model: Customer,
							attributes: ["firstName", "lastName", "email"],
						},
					],
				},
			],
		});
	}
}
