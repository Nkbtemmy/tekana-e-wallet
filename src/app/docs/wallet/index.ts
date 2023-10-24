import responses from "../responses";

const wallet = {
	"/wallets": {
		post: {
			tags: ["Wallet"],
			summary: "create new wallet",
			security: [
				{
					JWT: [],
				},
			],
			parameters: [],
			consumes: ["application/json"],
			produces: ["application/json"],
			responses,
		},
		get: {
			tags: ["Wallet"],
			summary: "get all my wallets",
			security: [
				{
					JWT: [],
				},
			],
			parameters: [],
			consumes: ["application/json"],
			produces: ["application/json"],
			responses,
		},
	},
};

export default wallet;
