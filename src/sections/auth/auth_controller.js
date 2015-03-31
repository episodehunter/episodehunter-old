/* @flow */
'use strict';

var JWT = require('jsonwebtoken');
var db = require('../../lib/db');

var secret = 'asdfghjklpoiy';

class Auth {

    constructor() {

    }

    login(request: Object, reply: Function) {
        db.getUser(request.params.userid)
            .then(user => {
                reply({
                    token: JWT.sign(user, secret)
                }).type('application/json');
            })
            .catch(() => reply('No user :('));
    }

}

module.exports = Auth;
