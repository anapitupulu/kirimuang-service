'use strict';
module.exports = (sequelize, DataTypes) => {
  const CurrencyRate = sequelize.define('CurrencyRate', {
    usdToIdr: DataTypes.FLOAT,
    usdToIdrRounded: DataTypes.FLOAT,
    idrToUsd: DataTypes.FLOAT,
    idrToUsdRounded: DataTypes.FLOAT
  }, {});
  CurrencyRate.associate = function(models) {
    // associations can be defined here
  };
  return CurrencyRate;
};