import {config} from '../config';
const Knex = require('knex');

let knex = undefined;

function connect() {
    if (knex === undefined) {
        knex = Knex(config.db);
    }
    return knex;
}

export {knex as database};
