import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';

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
    this.startSwaggerDoc();
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
    this.express.use(`/api/${process.env.API_VERSION}`, routes.flickrRouter);
  }

  /**
   * 
   */
  private connectToDb(): void {
    connectDb();
  }

  private startSwaggerDoc(): void {
    const swaggerDocument = require('../swagger.json');
    this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().express;