import {config} from '../config';
import Knex = require('knex');

let knex = undefined;

function connect() {
    if (knex === undefined) {
        knex = Knex(config.db);
    }
    return knex;
}

export {knex as database};
