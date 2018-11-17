/* app/server.ts */

// Import everything from express and assign it to the express variable
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import {Model} from 'sequelize-typescript';
const SequelizeStore = require('connect-session-sequelize')(session.Store);

import {AccountController, TransactionController, RateController} from './app/controllers';

import db from './app/datasource/database';
import Account from './app/models/account';
import User from './app/models/user';

const app: express.Application = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

const SESSION_SECRET: string = process.env.SESSION_SECRET || '';
app.use(session({
  name: 'user_sid',
  secret: SESSION_SECRET,
  store: new SequelizeStore({
    db
  }),
  resave: false,
  saveUninitialized: false,
}));

db.sync();

app.use('/rate', RateController);
app.route('/authenticate')
  .post((req: express.Request, res: express.Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    User.findOne({where: {email}}).then((user: User | null) => {
      if (!user) {
        res.status(500).send('User is not found');
      } else if (!user.validPassword(password)) {
        res.sendStatus(401);
      } else {
        req.session!.user = user.dataValues;
        res.sendStatus(200);
      }
    });
});

app.use((req: express.Request, res: express.Response, next: Function) => {
  if (req.cookies.user_sid && !req.session!.user) {
    res.clearCookie('user_sid');
    res.sendStatus(401);
  } else {
    next();
  }
});

app.use((req: express.Request, res: express.Response, next: Function) => {
  if (req.session!.user && req.cookies.user_sid) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.get('/logout', (req: express.Request, res: express.Response) => {
  if(req.session!.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.send('Successfully logged out');
  } else {
    res.status(500).send('Session is not found');
  }
});

app.use('/account', AccountController);
app.use('/transaction', TransactionController);

const port: number = +(process.env.PORT || 3000);
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
