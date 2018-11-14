'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    bank: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    branch: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Account.associate = function(models) {
    Account.hasOne(models.Transaction, {as: 'Sender', foreignKey: 'Transactions_senderId_accounts_fk'});
    Account.hasOne(models.Transaction, {as: 'Receiver', foreignKey: 'Transactions_receiverId_accounts_fk'});
    models.Transaction.belongsTo(Account);
  };
  return Account;
};
