// Import only what we need from express
import {asyncMiddleware} from '../../utils/async-middleware';
import db, {Account, Transaction} from '../datasource/database';
import { Router, Request, Response } from 'express';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

// Assign router to the express.Router() instance
const router: Router = Router();

const Op = Sequelize.Op;

router.get('/', asyncMiddleware(async (req: Request, res: Response, next: Function) => {
  let transactions: any[] = [];
  if (!req.query.name) {
    transactions = await Transaction.all();
    res.json(transactions);
    return;
  } 

  const accounts: any[] = await Account.findAll({
    attributes:['id'],
    where: {
      name: {
        [Op.like]: `%${req.query.name || ''}%`,
      }
    },
  });

  transactions = await Transaction.findAll({
    where: {
      [Op.or]: [
        { senderId: { [Op.in]: _.map(accounts, 'id'), }, },
        { receiverId: { [Op.in]: _.map(accounts, 'id'), }, },
      ]
    },
  });

  res.json(transactions);
}));

router.post('/', asyncMiddleware(async (req: Request, res: Response, next: Function) => {
  // Extract the name from the request parameters
  const params = req.body;

  const transaction: any = Transaction.create({
    senderId: params.senderId,
    receiverId: params.receiverId,
    usDollarAmount: params.usDollarAmount,
    idrDollarAmount: params.idrDollarAmount,
    rate: params.rate,
    transferred: false,
    paid: false,
    fee: params.fee,
  });
  res.json(transaction);
}));

// Export the express.Router() instance to be used by server.ts
export const TransactionController: Router = router;
