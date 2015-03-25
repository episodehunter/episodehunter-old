'use strict';

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

Movies.inject = ['lib.db']

module.exports = Movies;
