import '../../set-env-var';
import {assert} from 'chai';
import {mockDb} from '../helper/database';
import {headers, loginIfTrying} from '../helper/auth';
import {server} from '../server';

describe('Shows', () => {
    let tracker;

    before(() => {
        tracker = mockDb();
    });

    beforeEach(() => {
        tracker.install();
    });

    afterEach(() => {
        tracker.uninstall();
    });

    describe('Fetch', () => {

        it(`Should get unauthorized response if trying to fetch shows with invalid token`, () => {
            let options: any = {
                method: 'GET',
                url: '/show/1',
                headers: {
                    Authorization: 'bad-token'
                }
            };

            tracker.on('query', query => {
                loginIfTrying(query);
            });

            return server.injectThen(options)
                .then(response => {
                    assert.equal(response.statusCode, 401);
                });
        });

        it(`Should return 404 for a shows that doesn't exist`, () => {
            let options: any = {
                method: 'GET',
                url: '/show/1',
                headers: headers
            };

            tracker.on('query', query => {
                if (loginIfTrying(query)) {
                    return;
                }
                query.response(undefined);
            });

            return server.injectThen(options)
                .then(response => {
                    assert.equal(response.statusCode, 404);
                    assert.deepEqual(response.result, { statusCode: 404, error: 'Not Found' });
                });
        });

        it(`Should return a tv show when asking for it`, () => {
            let options: any = {
                method: 'GET',
                url: '/show/3860',
                headers: headers
            };

            let dbRow = {
                id: 3860,
                tvdbId: '289590',
                imdbId: 'tt4158110',
                title: 'Mr. Robot',
                dayOfWeek: 'Wednesday',
                time: '10:00 PM',
                first: '2015-06-24',
                genre: '|Drama|',
                language: 'en',
                network: 'USA Network',
                overview: 'A contemporary and culturally resonant drama about a young programmer',
                runtime: 60,
                status: 'Continuing',
                fanart: '556781d25eb23.jpg',
                poster: '556781d26549e.jpg'
            };

            tracker.on('query', query => {
                if (loginIfTrying(query)) {
                    return;
                }
                query.response(dbRow);
            });

            return server.injectThen(options)
                .then(response => {
                    let result = response.result;
                    assert.equal(response.statusCode, 200);
                    assert.deepEqual(result, {
                    show: {
                        ids: {
                            id: dbRow.id
                        },
                        title: dbRow.title,
                        year: 2015,
                        airs: {
                            dayOfWeek: dbRow.dayOfWeek,
                            time: dbRow.time,
                            first: dbRow.first
                        },
                        genre: ['Drama'],
                        language: dbRow.language,
                        network: dbRow.network,
                        overview: dbRow.overview,
                        runtime: dbRow.runtime,
                        status: dbRow.status,
                        fanart: dbRow.fanart,
                        poster: dbRow.poster
                    }
                });
            });
        });
    });
});
