var oxr = require('open-exchange-rates');
import CurrencyRate from './app/models/currencyrate'
oxr.set({ app_id: process.env.OPENEXCHANGE_APP_ID});
oxr.latest(() => {
  const rate: any = CurrencyRate.create({
    usdToIdr: oxr.rates.IDR,
    usdToIdrRounded: Math.floor((oxr.rates.IDR - 250) / 50) * 50,
    idrToUsd: oxr.rates.IDR + 100,
    idrToUsdRounded: Math.ceil((oxr.rates.IDR + 100) / 50) * 50,
  }).then((rate: any) => {
    console.log(rate.dataValues);
    process.exit();
  }).catch(error => {
    console.error(error);
    process.exit();
  });
});
