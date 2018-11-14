'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    senderId: {
      type: Sequelize.UUID,
      references: {
        model: Account,
        key: 'id',
      },
    },
    receiverId: {
      type: Sequelize.UUID,
      references: {
        model: Account,
        key: 'id',
      },
    },
    usdAmount: {
      type:  Sequelize.FLOAT,
    },
    idrAmount: {
      type:  Sequelize.FLOAT,
    },
    rate: {
      type:  Sequelize.FLOAT,
    },
    transferred: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    usdFee: {
      type: Sequelize.FLOAT,
    },
    idrFee: {
      type: Sequelize.FLOAT,
    },
    notes: {
      type: Sequelize.STRING,
    },
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};
