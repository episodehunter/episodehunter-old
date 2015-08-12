import {IDictionary} from 'hapi';
let mockKnex = require('mock-knex');
import {database} from '../../lib/db';

let mockDb = () => {
    let tracker = mockKnex.getTracker();
    mockKnex.mock(database.q, 'knex@0.7');
    return tracker;
}

let headers: IDictionary<string> = {
    // Using `password` as password
    Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJqb2huX2RvZSIsImlhdCI6MTQzOTAzOTk0Mn0.YHCmioHo0SeYE3DGFdKaGHaXL_OtMZhrA4UNjml1d6U'
};

let loginIfTrying = query => {
    if (query.sql === 'select `id`, `username`, `password` from `users` where `id` = ? limit ?') {
        query.response({
            username: 'john_doe',
            password: 'password'
        });
        return true;
    }
    return false;
}


export {mockDb, headers, loginIfTrying};
