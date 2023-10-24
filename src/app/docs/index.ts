import os from "os";
import dotenv from "dotenv";

import swaggerDoc from "./swagger.json";
import customer from "./customer";
import wallet from "./wallet";
import account from "./account";
import transaction from "./transaction";

const defaults = swaggerDoc.paths;

dotenv.config();

const paths = {
	...defaults,
	...customer,
	...wallet,
	...account,
	...transaction,
};

const config = {
	swagger: "2.0",
	info: {
		version: "1.0.0.",
		title: "Tekana E-Wallet APIs Documentation",
		description: "",
	},
	servers: [
		{
			url: `http://localhost:${process.env.PORT}`,
			name: `${os.hostname()}`,
		},
		{
			url: `https://${process.env.HOST}`,
			name: `${os.hostname()}`,
		},
	],
	basePath: `/api/${process.env.API_VERSION || "v1"}`,
	schemes: ["http", "https"],
	securityDefinitions: {
		JWT: {
			type: "apiKey",
			name: "Authorization",
			in: "header",
			description: 'Use "Bearer [token]" for authorization',
		},
	},
	tags: [
		{
			name: "TEKANA E-Wallet APIs Documentation",
		},
	],
	consumes: ["application/json"],
	produces: ["application/json"],
	paths,
};
export default config;
