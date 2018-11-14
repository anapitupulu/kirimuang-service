'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('accounts', {
      fields: ['id'],
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('accounts', 'accounts_id');
  },
};
