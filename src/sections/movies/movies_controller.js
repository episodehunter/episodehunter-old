/* @flow */
'use strict';

var db = require('../../lib/db');

class Movies {

    db: Database;

    constructor(_db: Database) {
        this.db = _db;
    }

    get(request: Object, reply: Function) {
        console.log('Okej, using: ' + request.headers.authorization);
        this.db.query('Something').then(result => {
            reply(result).type('application/json');
        });
    }

    post(request: Object, reply: Function) {
        reply('Post!');
    }

}

Movies.inject = [db];
module.exports = Movies;
