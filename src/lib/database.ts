import {config} from '../config';
import Knex = require('knex');

const knex = Knex(config.db)

export {knex as database};
