import DB from "../database/models";

const { Customer } = DB;

export default class CustomerService {
	static async create(data: object) {
		return Customer.create(data);
	}

	static async getAll() {
		return Customer.findAll();
	}

	static async findByPk(id: string) {
		return Customer.findByPk(id);
	}

	static async delete(id: string) {
		return Customer.destroy(id);
	}

	static async findOne(condition: object) {
		return await Customer.findOne({
			where: condition,
		});
	

	}
}
