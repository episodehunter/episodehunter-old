/* @flow */
'use strict';

var db = require('../../lib/db');

class MovieService {

    db: Database;

    constructor(_db: Database) {
        this.db = _db;
    }

    getMovie(id: number) {
        return new Promise(resolve => {
            setTimeout(() => resolve({
                'id': id,
                'title': 'Best film ever'
            }), 500);
        });
    }

}

MovieService.inject = [db];

export default MovieService;
