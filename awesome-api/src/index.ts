import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';

import { connectDb } from './db/config';
import routes from './router';
import { authMiddleware } from './middleware/authMiddleware';

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
    this.express.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }

  private setRoutes(): void {
    this.express.use(`/api/${process.env.API_VERSION}/user`, routes.userRouter);
    this.express.use(`/api/${process.env.API_VERSION}/auth`, routes.authRouter);
    this.express.use(`/api/${process.env.API_VERSION}/flickr`, authMiddleware, routes.flickrRouter);
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
