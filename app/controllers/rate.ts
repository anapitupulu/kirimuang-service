// Import only what we need from express
import db from '../datasource/database';
import CurrencyRate from '../models/currencyrate'
import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  CurrencyRate.findAll().then((result: any) => {
    res.json(result);
  })
});

router.get('/latest', (req: Request, res: Response) => {
  CurrencyRate.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
  }).then((result: any) => {
    res.json(result);
  })
});

export const RateController: Router = router;
