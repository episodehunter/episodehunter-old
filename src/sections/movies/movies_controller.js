'use strict';

var db = require('../../lib/db');

class Movies {

    constructor(db) {
        this.db = db;
    }

    get(request, reply) {
        console.log('Okej, using: ' + request.headers.authorization);
        this.db.query('Something').then(result => {
            reply(result).type('application/json');
        });
    }

    post(request, reply) {
        reply('Post!');
    }

}

Movies.inject = [db];
module.exports = Movies;
