'use strict';
import { UUIDV4 } from 'sequelize';
import { Model } from 'sequelize';
import { CustomerAttributes } from '../attributes/Attributes';

module.exports = (sequelize:any, DataTypes:any) => {
  class Customer extends Model<CustomerAttributes> 
  implements CustomerAttributes{
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    telephoneNumber!: string;
    address!: object;
    dateOfBirth!: Date;
    isLoggedIn!: boolean;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models:any) {
      Customer.hasMany(models.Account, { foreignKey: 'customerId', onDelete: 'CASCADE' });
      Customer.hasMany(models.Transaction, { foreignKey: 'customerId', onDelete: 'CASCADE' });
      Customer.hasOne(models.Wallet, { foreignKey: 'customerId', onDelete: 'CASCADE' });

    }
  }
  Customer.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull:false,
      primaryKey: true
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    telephoneNumber:{
      type: DataTypes.STRING,
      allowNull: true
    },
    address:{
      type: DataTypes.JSONB,
    },
    dateOfBirth:{
      type: DataTypes.DATE,
      defaultValue: false
    },
    isLoggedIn:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    modelName: 'Customer',
    tableName: 'tbl_customers',
    underscored: false,
  });
  return Customer;
};