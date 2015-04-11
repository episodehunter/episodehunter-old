/* @flow */
'use strict';

var knexModule = require('knex');
var databaseModels = require('../model/database');

console.log('Connection to db..');

var knex = knexModule({
    client: 'mysql',
        connection: {
            host: '192.168.56.101',
            user: 'episodehunter',
            password: 'episodehunter',
            database: 'episodehunter'
        },
        debug: true
});

module.exports = {
    q: knex,
    model: databaseModels
};
