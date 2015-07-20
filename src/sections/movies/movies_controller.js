/* @flow */
'use strict';

var db = require('../../lib/db');

class Movies {

    service: MovieService;

    constructor(_service: MovieService) {
        this.service = _service;
    }

    get(request: Object, reply: Function) {
        console.log('Okej, using: ' + request.headers.authorization);
        this.service
            .getMovie(5)
            .then(result => {
                reply(result).type('application/json');
            });
    }

    post(request: Object, reply: Function) {
        reply('Post!');
    }

}

Movies.inject = [db];
module.exports = Movies;
