'use strict';

import Knex from 'knex';
import database from './lib/database';


class DatabaseRepository {
    db: Knex;

    constructor(db = database) {
        this.db = db.connect();
    }

}

export default DatabaseRepository;
export {DatabaseRepository};
