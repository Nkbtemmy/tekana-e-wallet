const dotenv = require("dotenv");

dotenv.config();

const config = {
	development: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		dialect: "postgres",
	},
	test: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		dialect: "postgres",
	},
	production: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		hbusinesst: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT || 5432,
		dialect: "postgres",
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
		logging: false,
	},
};

module.exports = config;
