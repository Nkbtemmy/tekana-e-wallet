"use strict";

import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/db.config")[env];
const db: any = {};

let sequelize: any;
if (config.use_env_variable) {
	sequelize = new Sequelize(config.use_env_variable, {
		host: config.host,
		dialect: config.dialect,
	});
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, {
		host: config.host,
		dialect: config.dialect,
	});
}

sequelize
	.authenticate()
	.then(() => {
		console.log("✅ Database connection has been established successfully.");
	})
	.catch((error: any) => {
		console.error("❌ Unable to connect to the database:", error.message);
	});

fs.readdirSync(__dirname)
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === (process.env.NODE_ENV == "production" ? ".js" : ".ts"),
	)
	.forEach((file: any) => {
		const model = require(path.join(__dirname, file))(sequelize, DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
