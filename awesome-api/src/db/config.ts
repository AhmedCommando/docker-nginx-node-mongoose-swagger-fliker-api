import * as mongoose from 'mongoose';

import logger from '../utils/winston-logger';

export function connectDb(): void {
    global.Promise = require('q').Promise;
    // mongoose.Promise = global.Promise;
    const dbConnection = `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    mongoose.connect(dbConnection,
      {user: process.env.DB_USER, pass: process.env.DB_PASSWORD}).then(() => {
        logger.info('DB connection established! ');
      }, (err) => {
        logger.error('Cant establish connection to the DB! ' + err);
      }
    );
}
