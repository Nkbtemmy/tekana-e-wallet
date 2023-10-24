'use strict';
import { Model, UUID, UUIDV4 } from 'sequelize';
import { TransactionAttributes } from '../attributes/Attributes';

module.exports = (sequelize:any, DataTypes:any) => {
  class Transaction extends Model<TransactionAttributes> implements TransactionAttributes {
    id!: string;
    accountId!: string;
    customerId!: string;
    toAccountId!: string;
    transactionType!: string;
    amount!: number;
    transactionDate!: Date;
    description!: string;
    createdAt!: Date;
    updatedAt!: Date;
  

    static associate(models:any) {
      Transaction.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
      Transaction.belongsTo(models.Account, { foreignKey: 'accountId', as: 'senderAccount' });
      Transaction.belongsTo(models.Account, { foreignKey: 'toAccountId',  as: 'receiverAccount' });
    }
  }
  Transaction.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
    toAccountId:{
      type: DataTypes.UUID,
      allowNull: true
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
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'tbl_transactions',
    underscored: false,
  });
  return Transaction;
};