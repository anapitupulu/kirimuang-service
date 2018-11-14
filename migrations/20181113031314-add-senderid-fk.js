'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addConstraint('Transactions', ['senderId'], {
          type: 'foreign key',
          references: {
            table: 'accounts',
            field: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Transactions', 'Transactions_senderId_accounts_fk');
  }
};
