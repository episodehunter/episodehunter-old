'use strict';

import {config} from '../config/index';
import Knex = require('knex');
import * as models from '../model/database/index';

const knex = Knex(config.db)

let database = {
    q: knex,
    model: models
}

export {database, models};
