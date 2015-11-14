'use strict';

import {config} from '../config';
import Knex from 'knex';

let knex = undefined;

function connect() {
    if (knex === undefined) {
        knex = Knex(config.db);
    }
    return knex;
}

export default {connect};
export {connect};
