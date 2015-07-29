'use strict';

import {db} from '../../lib/db';
import {Movie} from '../../model/movie';
import Promise = require('bluebird');

class MovieService {
    static inject = [db];
    db: db;

    constructor(db: db) {
        this.db = db;
    }

    getMovie(id: number): Promise<Movie> {
        return new Promise<Movie>(resolve => {
            var m = new Movie();
            m.id = id;
            m.title = 'Best film ever';
            setTimeout(() => resolve(Promise.resolve(m)), 500);
        });
    }

}

export {MovieService};
