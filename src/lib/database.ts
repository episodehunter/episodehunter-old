import {config} from '../config';
const Knex = require('knex');

const knex = Knex(config.db);

export {knex as database};
