// Import only what we need from express
import {asyncMiddleware} from '../../utils/async-middleware';
import db from '../datasource/database';
import Account from '../models/account';
import Transaction from '../models/transaction';
import { Router, Request, Response } from 'express';
import * as Sequelize from 'sequelize';
import {Model} from 'sequelize-typescript';
import * as _ from 'lodash';

// Assign router to the express.Router() instance
const router: Router = Router();
const Op = Sequelize.Op;
const associateWithAccount = [
  { model: Account, as: 'sender', },
  { model: Account, as: 'receiver', },
]

router.get('/', asyncMiddleware(async (req: Request, res: Response, next: Function) => {
  let transactions: any[] = [];
  if (!req.query.name) {
    transactions = await Transaction.findAll({
      include: associateWithAccount,
    });
  } else {
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
  }

  res.json(transactions);
}));

router.post('/', asyncMiddleware(async (req: Request, res: Response, next: Function) => {
  const params = req.body;

  const transaction: Transaction = await Transaction.create({
    senderId: params.senderId,
    receiverId: params.receiverId,
    usdAmount: params.usdAmount,
    idrAmount: params.idrAmount,
    rate: params.rate,
    transferred: params.transferred,
    paid: params.paid,
    usdFee: params.usdFee,
    idrFee: params.idrFee,
    notes: params.notes,
  });

  const newTransaction = await Transaction.findOne({
    where: {id: transaction.id},
    include: associateWithAccount,
  })

  res.json(newTransaction);
}));

router.put('/', async (req: Request, res: Response, next: Function) => {
  const params = req.body;

  let tsct: any | null = await Transaction.findById(params.id);
  if (tsct) {
    tsct = await tsct.update({
      senderId: params.senderId,
      receiverId: params.receiverId,
      usdAmount: params.usdAmount,
      idrAmount: params.idrAmount,
      rate: params.rate,
      transferred: params.transferred,
      paid: params.paid,
      usdFee: params.usdFee,
      idrFee: params.idrFee,
      notes: params.notes,
    });
    res.json(tsct);
  } else {
    res.status(500).send('Account is not found');
  }
})


router.delete('/', async (req: Request, res: Response, next: Function) => {
  const params = req.body;

  let tsct: Model<Transaction> | null = await Transaction.findById(params.id);
  if (tsct) {
    tsct.destroy();
    res.sendStatus(200);
  } else {
    res.status(500).send('Transaaction is not found');
  }

})

// Export the express.Router() instance to be used by server.ts
export const TransactionController: Router = router;
