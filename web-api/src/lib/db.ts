import Knex = require('knex');
import * as models from 'messages/database/index';
import config from '../config';

const knex = Knex(config.db);

let database = {
    q: knex,
    model: models
};

export { database, models, knex as db };
