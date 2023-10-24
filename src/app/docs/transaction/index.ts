import responses from "../responses";

const transaction = {
	"/transactions": {
		get: {
			tags: ["Transaction"],
			summary: "get all your transactions",
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
	"/transactions/deposit": {
		post: {
			tags: ["Transaction"],
			summary: "make deposite",
			security: [
				{
					JWT: [],
				},
			],
			parameters: [
				{
					in: "body",
					name: "body",
					schema: {
						example: {
							accountId: "",
							amount: "",
						},
					},
				},
			],
			consumes: ["application/json"],
			produces: ["application/json"],
			responses,
		},
		get: {
			tags: ["Transaction"],
			summary: "get all your deposit transactions",
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
	"/transactions/withdrawal": {
		post: {
			tags: ["Transaction"],
			summary: "make withdrawal",
			security: [
				{
					JWT: [],
				},
			],
			parameters: [
				{
					in: "body",
					name: "body",
					schema: {
						example: {
							accountId: "",
							amount: "",
						},
					},
				},
			],
			consumes: ["application/json"],
			produces: ["application/json"],
			responses,
		},
		get: {
			tags: ["Transaction"],
			summary: "get all your withdrawal transactions",
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
	"/transactions/transfer": {
		post: {
			tags: ["Transaction"],
			summary: "make transfer",
			security: [
				{
					JWT: [],
				},
			],
			parameters: [
				{
					in: "body",
					name: "body",
					schema: {
						example: {
							accountId: "",
							amount: "",
							toAccountId: "",
						},
					},
				},
			],
			consumes: ["application/json"],
			produces: ["application/json"],
			responses,
		},
		get: {
			tags: ["Transaction"],
			summary: "get all your transfer transactions",
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
	"/transactions/single/{id}": {
		get: {
			tags: ["Transaction"],
			summary: "Get one transaction",
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

export default transaction;
