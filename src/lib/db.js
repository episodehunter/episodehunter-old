/* @flow */
'use strict';

import config from 'config';
import knexModule from 'knex';
import databaseModels from '../model/database';

let knex = knexModule(config.get('db'));

export default {
    q: knex,
    model: databaseModels
};
