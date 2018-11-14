'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CurrencyRates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usdToIdr: {
        type: Sequelize.FLOAT
      },
      usdToIdrRounded: {
        type: Sequelize.FLOAT
      },
      idrToUsd: {
        type: Sequelize.FLOAT
      },
      idrToUsdRounded: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CurrencyRates');
  }
};