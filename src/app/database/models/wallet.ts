'use strict';
import { UUIDV4 } from 'sequelize';
import { Model } from 'sequelize';
import { WalletAttributes } from '../attributes/Attributes';

module.exports = (sequelize:any, DataTypes:any) => {
  class Wallet extends Model<WalletAttributes> 
  implements WalletAttributes{
    id!: string;
    customerId!: string;
    walletBalance!: number;
    createdAt!: Date;
    updatedAt!: Date;
    static associate(models:any) {
      Wallet.belongsTo(models.Customer, { foreignKey: 'customerId' })
    }
  }
  Wallet.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull:false,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    walletBalance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
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
  }, {
    sequelize,
    modelName: 'Wallet',
    tableName: 'tbl_Wallets',
    underscored: false,
  });
  return Wallet;
};