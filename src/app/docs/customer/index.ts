import responses from "../responses";

const customer = {
	"/customers/signup": {
		post: {
			tags: ["Customer"],
			summary: "create new customer",
			parameters: [
				{
					in: "body",
					name: "body",
					schema: {
						example: {
							firstName: "admin",
							lastName: "example",
							email: "admin@example.com",
							password: "admin123!",
							telephoneNumber: "0788888776",
							address: {
								city: "Kigali",
								street: "Nyamirambo",
								sector: "Rwezamenyo",
							},
							dateOfBirth: "10/12/2001",
						},
					},
				},
			],
			consumes: ["application/json"],
			produces: ["application/json"],
			responses,
		},
	},
	"/customers/login": {
		post: {
			tags: ["Customer"],
			summary: "Login with email and password",
			description: "",
			parameters: [
				{
					in: "body",
					name: "body",
					schema: {
						example: {
							email: "admin@example.com",
							password: "admin123!",
						},
					},
					required: true,
				},
			],
			consumes: ["application/json"],
			produces: ["application/json"],
			responses,
		},
	},
	"/customers/profile": {
		get: {
			tags: ["Customer"],
			summary: "Get my profile",
			parameters: [],
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
	"/customers/logout": {
		put: {
			tags: ["Customer"],
			summary: "Logout customer",
			parameters: [],
			description: "",
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
	"/customers": {
		get: {
			tags: ["Customer"],
			summary: "Get all customer",
			parameters: [],
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
	"/customers/{id}": {
		get: {
			tags: ["Customer"],
			summary: "Get one customer",
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

export default customer;
