import * as mongoose from 'mongoose';

import logger from '../utils/winston-logger';

/**
 * handle database connection
 * currently db have no user nor password but in case you have 
 * please add the env variables to both testing env and project env
 */
export function connectDb(): void {
    global.Promise = require('q').Promise;
    const dbConnection = `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    mongoose.set('useCreateIndex', true);
    if (mongoose.connection.readyState !== 1) {
      mongoose.set('useFindAndModify', false);
      mongoose.connect(dbConnection,
        {user: process.env.DB_USER, pass: process.env.DB_PASSWORD, useNewUrlParser: true}).then(() => {
          logger.info('DB connection established! ');
        }, (err) => {
          logger.error('Cant establish connection to the DB! ' + err);
        }
      );
    }
}
