const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require("sequelize");

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.createTable("tbl_accounts", {
			id: {
				type: DataTypes.UUID,
				defaultValue: uuidv4(),
				primaryKey: true,
				allowNull: false,
			},
      customerId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			accountType: {
        type: DataTypes.ENUM('SAVING', 'CHECKING'),
        defaultValue: 'CHECKING',
        allowNull: false,
			},
      accountNumber: {
				type: DataTypes.UUID,
        defaultValue: uuidv4(),
				allowNull: false,
			},
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      openDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
		await queryInterface.dropTable("tbl_accounts");
	},
};
