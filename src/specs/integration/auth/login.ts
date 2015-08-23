let lab = require('lab').script();
let code = require('code');
import {mockDb, headers, loginIfTrying} from '../helper-functions';
import {server} from '../../../server';

let tracker = mockDb();
tracker.install();

lab.test(`Should be able to login with valid credentials`, done => {
    let options: any = {
        method: 'POST',
        url: '/auth/create-token',
        payload: {
            username: 'john_doe',
            password: 'password'
        }
    };

    tracker.on('query', query => {
        query.response({
            id: 2,
            username: 'john_doe',
            password: '$2a$10$EgZ6kJhLbgQxDqSqrIUXteRQtzKtxSjldQ4hcTuSBiRYTobaIpOo.'
        });
    });

    server.inject(options, response => {
        let result = response.result;

        code.expect(response.statusCode).to.equal(200);
        code.expect(result['token']).to.have.length(144);

        done();
    });

});

export {lab};
