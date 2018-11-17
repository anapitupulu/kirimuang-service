import {Model} from 'sequelize-typescript';
import db from './app/datasource/database';
import Transaction from './app/models/transaction';
import Account from './app/models/account';

async function print() {
  await db.sync();
  const transactions: Transaction[] = await Transaction.findAll();
  const sender: Model<Account> | Model<Account>[] = await transactions[0].$get('sender');
  process.exit();
}

print();
