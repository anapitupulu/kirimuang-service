// Import only what we need from express
import db, {Account} from '../datasource/database';
import { Router, Request, Response } from 'express';
import * as Sequelize from 'sequelize';

// Assign router to the express.Router() instance
const router: Router = Router();

const Op = Sequelize.Op;

router.get('/', (req: Request, res: Response) => {
  Account.findAll({
    where: {
      name: {
        [Op.like]: `%${req.query.name || ''}%`,
      }
    },
  }).then((result: any) => {
    res.json(result);
  })
});

router.post('/', (req: Request, res: Response, next: Function) => {
  // Extract the name from the request parameters
  const params = req.body;

  Account.create({
    name: params.name,
    bank: params.bank,
    accountNumber: params.accountNumber,
    branch: params.branch,
    location: params.location,
    phone: params.phone,
  }).then((account: any) => {
    res.json(account.get({
      plain: true,
    }));
  }).catch(error => {
    next(error);
  });
});

// Export the express.Router() instance to be used by server.ts
export const AccountController: Router = router;
