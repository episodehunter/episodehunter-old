'use strict';

import config from '../config';
import Knex = require('knex');
import * as models from '../episodehunter-messages/database/index';

const knex = Knex(config.db)

let database = {
    q: knex,
    model: models
};

export {database, models};
