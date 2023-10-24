const dotenv = require("dotenv");

dotenv.config();

const config = {
	development: {
		use_env_variable: process.env.DATABASE_URL,
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		dialect: "postgres",
	},
	test: {
		use_env_variable: process.env.DATABASE_URL,
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		dialect: "postgres",
	},
	production: {
		use_env_variable: process.env.DATABASE_URL,
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
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
