/* app/server.ts */

// Import everything from express and assign it to the express variable
import * as express from 'express';
import * as bodyParser from 'body-parser';

// Import WelcomeController from controllers entry point
import {AccountController, TransactionController} from './app/controllers';

import db, {Account} from './app/datasource/database';

// Create a new express application instance
const app: express.Application = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// The port the express app will listen on
const port: number = +(process.env.PORT || 3000);

// Mount the WelcomeController at the /welcome route
app.use('/account', AccountController);
app.use('/transaction', TransactionController);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
