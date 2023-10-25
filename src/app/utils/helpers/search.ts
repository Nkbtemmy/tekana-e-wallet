import { Op } from "sequelize";

export const formatOrClause = (query: string) => {
	const orClause: any = [];
	let queryObject = {};
	try {
		queryObject = JSON.parse(query);
	} catch (error:any) {
		throw new Error(error?.message)
	}
	for (const [key, value] of Object.entries(queryObject)) {
		orClause.push({
			[key]: {
				[Op.iLike]: `%${value}%`,
			},
		});
	}
	return orClause;
};
