import * as bcryptjs from 'bcryptjs';
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
  },
  bank: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  accountNumber: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isAlphanumeric: true,
    },
  },
  branch: {
    type: Sequelize.STRING,
    allowNull: true,
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
    allowNull: true,
    validate: {
      isAlphanumeric: true,
    },
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
  usdAmount: {
    type:  Sequelize.FLOAT,
  },
  idrAmount: {
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
  usdFee: {
    type: Sequelize.FLOAT,
  },
  idrFee: {
    type: Sequelize.FLOAT,
  },
  notes: {
    type: Sequelize.STRING,
  },
});

const CurrencyRate = db.define('currency-rate', {
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
});

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: (user: any) => {
      user.password = bcryptjs.hashSync(user.password,13);
    }
  },
})

interface IPrototype { prototype: any; }

(User as any).prototype.validPassword = function(password: string) {
  return bcryptjs.compareSync(password, this.password);
};

function syncDatabase() {
  db.sync().then(() => {
  // db.sync({ force: true }).then(() => {
    console.log('Successfully syncing databse');

  }).catch(error => {
    console.error('Error syncing database: ', error);
  })
}

export default db;
export {
  Account,
  Transaction,
  CurrencyRate,
  User,
};
