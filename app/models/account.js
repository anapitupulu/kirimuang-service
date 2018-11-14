'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    bank: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    accountNumber: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    branch: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    location: {
      type: Sequelize.STRING,
      validate: {
        isAlphanumeric: true,
        isIn: [['Indonesia', 'USA']]
      }
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isAlphanumeric: true,
      },
    },
  }, {});
  Account.associate = function(models) {
    Account.hasOne(models.Transaction, {as: 'Sender', foreignKey: 'Transactions_senderId_accounts_fk'});
    Account.hasOne(models.Transaction, {as: 'Receiver', foreignKey: 'Transactions_receiverId_accounts_fk'});
    models.Transaction.belongsTo(Account);
  };
  return Account;
};
