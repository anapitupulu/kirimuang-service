'use strict';
module.exports = (sequelize, DataTypes) => {
  const CurrencyRate = sequelize.define('CurrencyRate', {
    usdToIdr: {
      type: Sequelize.FLOAT,
    },
    usdToIdrRounded: {
      type: Sequelize.FLOAT,
    },
    idrToUsd: {
      type: Sequelize.FLOAT,
    },
    idrToUsdRounded: {
      type: Sequelize.FLOAT,
    },
  }, {});
  CurrencyRate.associate = function(models) {
    // associations can be defined here
  };
  return CurrencyRate;
};
