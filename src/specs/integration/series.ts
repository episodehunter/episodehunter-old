let lab = require('lab').script();
let code = require('code');
import {mockDb, headers, loginIfTrying} from './helper-functions';
import {server} from '../../server';

let tracker = mockDb();
tracker.install();

lab.test(`Should return 404 for a series that doesn't exist`, done => {
    let options = {
        method: 'GET',
        url: '/series/1',
        headers: headers
    };

    tracker.on('query', query => {
        if (loginIfTrying(query)) return;
        query.response(undefined);
    });

    server.inject(options, response => {
        let result = response.result;

        code.expect(response.statusCode).to.equal(404);
        code.expect(result).to.deep.equal({ statusCode: 404, error: 'Not Found' });

        done();
    });
});

export {lab};
