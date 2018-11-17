import {Model} from 'sequelize-typescript';
import db from './app/datasource/database';
import Transaction from './app/models/transaction';
import * as Sequelize from 'sequelize';
import Account from './app/models/account';

async function print() {
  await db.sync();
  const transactions: any[] = await Transaction.findAll({
    include: [
      {
        model: Account,
        as: 'sender',
        where: {id: Sequelize.col('Transaction.senderId')},
      },
      {
        model: Account,
        as: 'receiver',
        where: {id: Sequelize.col('Transaction.receiverId')},
      },
    ]
  });
  console.log(transactions[0]);

  process.exit();
}

print();
