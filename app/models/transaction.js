'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: DataTypes.UUID,
    senderId: DataTypes.UUID,
    receiverId: DataTypes.UUID,
    usdAmount: DataTypes.FLOAT,
    idrAmount: DataTypes.FLOAT,
    rate: DataTypes.FLOAT,
    transferred: DataTypes.BOOLEAN,
    paid: DataTypes.BOOLEAN,
    usdFee: DataTypes.FLOAT,
    idrFee: DataTypes.FLOAT,
    notes: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};