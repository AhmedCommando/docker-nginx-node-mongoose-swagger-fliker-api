import * as bodyParser from 'body-parser';
import * as express from 'express';

import { connectDb } from './db/config';
import routes from './router';

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  express: express.Express;

  // Run configuration methods on the Express instance.
  constructor() {
      // test
    this.express = express();
    this.middleware();
    this.setRoutes();
    this.connectToDb();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.disable('x-powered-by');
  }

  private setRoutes(): void {
    this.express.use(`/api/${process.env.API_VERSION}`, routes.userRouter);
    this.express.use(`/api/${process.env.API_VERSION}`, routes.authRouter);
  }

  /**
   * 
   */
  private connectToDb(): void {
    connectDb();
  }
}

export default new App().express;
