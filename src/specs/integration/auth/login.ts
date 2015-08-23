import {assert} from 'chai';
import {server} from '../server';
import {mockDb} from '../helper/database';


describe('Auth', () => {

    let tracker;

    before(() => {
        tracker = mockDb();
    })

    beforeEach(() => {
        tracker.install();
    });

    afterEach(() => {
        tracker.uninstall();
    });

    describe('Login', () => {

        it(`Should be able to login with valid credentials`, () => {

            let options: any = {
                method: 'POST',
                url: '/auth/create-token',
                payload: {
                    username: 'john_snow',
                    password: 'password'
                }
            };

            tracker.on('query', query => {
                query.response({
                    id: 2,
                    username: 'john_snow',
                    password: '$2a$10$EgZ6kJhLbgQxDqSqrIUXteRQtzKtxSjldQ4hcTuSBiRYTobaIpOo.'
                });
            });

            return server.injectThen(options)
                .then(response => {
                    let result = response.result;

                    assert.equal(response.statusCode, 200);
                    assert.closeTo(result['token'].length, 150, 50);
                });
        });

    });

});
