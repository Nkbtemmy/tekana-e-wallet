"use strict";
import { UUIDV4 } from "sequelize";
import { Model } from "sequelize";
import { AccountAttributes } from "../attributes/Attributes";

module.exports = (sequelize: any, DataTypes: any) => {
	class Account extends Model<AccountAttributes> implements AccountAttributes {
		id!: string;
		walletId!: string;
		accountType!: string;
		accountNumber!: string;
		balance!: number;
		openDate!: Date;
		createdAt!: Date;
		updatedAt!: Date;

		static associate(models: any) {
			Account.belongsTo(models.Wallet, { foreignKey: "walletId" });
			Account.hasMany(models.Transaction, { foreignKey: "accountId" });
			Account.hasMany(models.Transaction, { foreignKey: "toAccountId" });
		}
	}
	Account.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			walletId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			accountType: {
				type: DataTypes.ENUM("SAVING", "CHECKING"),
				defaultValue: "CHECKING",
			},
			accountNumber: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: UUIDV4,
			},
			balance: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			openDate: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			sequelize,
			modelName: "Account",
			tableName: "tbl_accounts",
			underscored: false,
		},
	);
	return Account;
};
