import DB from "../database/models";
import { formatOrClause } from "../utils/helpers/search";
import { Op } from "sequelize";

const { Transaction, Customer, Account } = DB;

export default class TransactionService {
	static async create(data: object) {
		return Transaction.create(data);
	}

	static async findOne(condition: object) {
		return await Transaction.findOne({
			where: condition,
		});
	}

	static async getAll() {
		return Transaction.findAll();
	}

	static async findByPk(id: string) {
		return Transaction.findByPk(id);
	}

	static async delete(id: string) {
		return Transaction.destroy(id);
	}

	static async update(id: string, data: Record<string, any>) {
		await Transaction.update(data, {
			where: {
				id,
			},
		});
	}

	static findAllAndCount(payload: any) {
		const whereClause = payload.where || {};
		const orClause = formatOrClause(payload.search);
		if (orClause.length) {
			whereClause[Op.or] = orClause;
		}
		return Transaction.findAndCountAll({
			limit: payload?.limit ? payload?.limit : undefined,
			offset: payload?.offset ? payload?.offset : undefined,
			order: payload?.order ? payload.order : undefined,
			where: whereClause,
			include: [
				{
					model: Customer,
					as: "customer",
					attributes: ["firstName", "lastName", "email"],
				},
				{
					model: Account,
					as: "senderAccount",
					attributes: ["balance"],
				},
				{
					model: Account,
					as: "receiverAccount",
					attributes: ["balance"],
				},
			],
		});
	}
}
