import responses from "../responses";

const account = {
	"/accounts": {
		post: {
			tags: ["Account"],
			summary: "create new account",
			security: [
				{
					JWT: [],
				},
			],
			parameters: [
				{
					in: "body",
					name: "accountType",
					schema: {
						type: "string",
						enum: ["SAVING", "CHECKING"],
						example: {
							accountType: "SAVING",
						},
					},
				},
			],
			consumes: ["application/json"],
			produces: ["application/json"],
			responses,
		},
		get: {
			tags: ["Account"],
			summary: "Get all my accounts",
			parameters: [],
			security: [
				{
					JWT: [],
				},
			],
			consumes: ["application/json"],
			produces: ["application/json"],
			responses,
		},
	},
	"/accounts/{id}": {
		get: {
			tags: ["Account"],
			summary: "Get one account",
			parameters: [
				{
					in: "path",
					name: "id",
					required: true,
					type: "string",
				},
			],
			consumes: ["application/json"],
			produces: ["application/json"],
			responses,
			security: [
				{
					JWT: [],
				},
			],
		},
	},
};

export default account;
