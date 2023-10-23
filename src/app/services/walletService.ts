import DB from "../database/models";

const { Wallet, Customer } = DB;

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
				  attributes: ['firstName', 'lastName', 'email']
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

}
