const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require("sequelize");

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.createTable("tbl_customers", {
			id: {
				type: DataTypes.UUID,
				defaultValue: uuidv4(),
				primaryKey: true,
				allowNull: false,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			telephoneNumber: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			address: {
				type: DataTypes.JSONB,
				allowNull: true,
			},
			dateOfBirth: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			isLoggedIn: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable("tbl_customers");
	},
};
