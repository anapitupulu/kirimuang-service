import * as Sequelize from 'sequelize';

const DATABASE_URL = process.env.CLEARDB_DATABASE_URL || '';

const db = new Sequelize(DATABASE_URL, {}); 

const Account = db.define('account', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
    }
  },
  bank: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
    },
  },
  accountNumber: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
    },
  },
  branch: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
    }
  },
  location: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
      isIn: [['Indonesia', 'USA']]
    }
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
    }
  },
});

const Transaction = db.define('transaction', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  senderId: {
    type: Sequelize.UUID,
    references: {
      model: Account,
      key: 'id',
    },
  },
  receiverId: {
    type: Sequelize.UUID,
    references: {
      model: Account,
      key: 'id',
    },
  },
  usDollarAmount: {
    type:  Sequelize.FLOAT,
  },
  idrDollarAmount: {
    type:  Sequelize.FLOAT,
  },
  rate: {
    type:  Sequelize.FLOAT,
  },
  transferred: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  paid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  fee: {
    type: Sequelize.FLOAT,
  },
});

db.sync().then(() => {
// db.sync({ force: true }).then(() => {
  console.log('Successfully syncing databse');

}).catch(error => {
  console.error('Error syncing database: ', error);
})


export default db;
export {
  Account,
  Transaction,
};
