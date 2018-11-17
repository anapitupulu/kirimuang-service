import * as bcryptjs from 'bcryptjs';
import {Sequelize} from 'sequelize-typescript';

const DATABASE_URL = process.env.CLEARDB_DATABASE_URL || '';

const db = new Sequelize({
  url: DATABASE_URL,
  modelPaths: [__dirname + '/../models']
}); 

export default db;
