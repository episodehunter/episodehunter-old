'use strict';

import {config} from '../config/index';
import Knex = require('knex');
import * as models from '../model/database/index';

const knex = Knex(config.db);

class db {
    q = knex;
    model = models;
}

export {knex, db, models};
