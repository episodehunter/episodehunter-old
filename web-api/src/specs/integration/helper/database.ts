import {exec} from 'child_process';
const mockKnex = require('mock-knex');

import {database} from '../../../lib/db';
import {hash} from '../../../lib/bcrypt';


const mockDb = () => {
    const tracker = mockKnex.getTracker();
    mockKnex.mock(database.q, 'knex@0.8');
    return tracker;
};

const resetDb = done => {
    const username = 'episodehunter';
    const password = 'episodehunter';
    const database = 'episodehunter_test';
    const filename = '/home/vagrant/data/vagrant/episodehunter.sql';
    const command = `mysql -u${username} -p${password} ${database} < ${filename}`;
    exec(command, done);
};

const createUser = (
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
};

export {resetDb, createUser, database, mockDb};
