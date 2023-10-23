const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require("sequelize");

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.createTable("tbl_transactions", {
      id:{
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        allowNull:false,
        primaryKey: true
      },
      accountId:{
        type: DataTypes.UUID,
        allowNull: false
      },
      customerId:{
        type: DataTypes.UUID,
        allowNull: false
      },
      transactionType:{
        type: DataTypes.ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER'),
        defaultValue: 'DEPOSIT',
        allowNull: false,
      },
      amount:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      transactionDate:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      description:{
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable("tbl_transactions");
	},
};
