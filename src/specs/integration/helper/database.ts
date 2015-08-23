import {join} from 'path'
import {exec} from 'child_process';
import {IDictionary} from 'hapi';
let mockKnex = require('mock-knex');

import {database} from '../../../lib/db';
import {hash} from '../../../lib/bcrypt';


let mockDb = () => {
    let tracker = mockKnex.getTracker();
    mockKnex.mock(database.q, 'knex@0.7');
    return tracker;
};

let resetDb = done => {
    let username = 'episodehunter';
    let password = 'episodehunter';
    let database = 'episodehunter_test';
    let filename = '/home/vagrant/data/vagrant/episodehunter.sql';
    let command = `mysql -u${username} -p${password} ${database} < ${filename}`;
    exec(command, done);
}

let createUser = (
        username: string = 'john_snow',
        password: string = 'password',
        email: string = 'john.snow@winterfell.wes',
        timezone: string = 'Europe/Stockholm',
        apikey: string = 'flux'
    ) => {
        return hash(password)
            .then(passHash => {
                return database.q
                    .insert({
                        username,
                        email,
                        password: passHash,
                        timezone,
                        apikey
                    })
                    .into('users');
            });
}

export {resetDb, createUser, database, mockDb};
