import {assert} from 'chai';
import {mockDb} from '../helper/database';
import {headers, loginIfTrying} from '../helper/auth';
import {server} from '../server';

describe('Movie', () => {
    let tracker;
    let url = '/movie/2';

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

        it(`Should get unauthorized response if trying to fetch a movie with invalid token`, () => {
            let options: any = {
                method: 'GET',
                url: url,
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

        it(`Should return 404 for a movie that doesn't exist`, () => {
            let options: any = {
                method: 'GET',
                url: url,
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
                    let result = response.result;
                    assert.equal(response.statusCode, 404);
                    assert.deepEqual(response.result, { statusCode: 404, error: 'Not Found' });
                });
        });

        it(`Should return a movie when asking for it`, () => {
            let options: any = {
                method: 'GET',
                url: url,
                headers: headers
            };

            let dbRow = {
                id: 2,
                tmdb_id: 44833,
                imdb_id: 'tt1440129',
                title: 'Battleship',
                orginal_title: 'Battleship',
                genre: '["Action","Science Fiction"]',
                tagline: 'The Battle for Earth Begins at Sea',
                runtime: 131,
                spoken_lang: '["English"]',
                companies: '["Battleship Delta Productions"]',
                trailer: 'qDMXkPfxjOc',
                release_date: '2012-04-11',
                budget: 200000000,
                overview: 'An international naval coalition becomes the world\'s last hope',
                poster: 'poster.jpg',
                fanart: 'fanart.jpg'
            };

            tracker.on('query', query => {
                if (loginIfTrying(query)) return;
                query.response(dbRow);
            });

            return server.injectThen(options)
                .then(response => {
                    let result = response.result;
                    assert.equal(response.statusCode, 200);
                    assert.deepEqual(result, {
                    movie: {
                        ids: {
                            id: dbRow.id,
                            tmdb: dbRow.tmdb_id,
                            imdb: dbRow.imdb_id
                        },
                        title: dbRow.title,
                        orginalTitle: dbRow.orginal_title,
                        genre: ['Action', 'Science Fiction'],
                        tagline: dbRow.tagline,
                        runtime: dbRow.runtime,
                        spokenLang: ['English'],
                        companies: ['Battleship Delta Productions'],
                        trailer: dbRow.trailer,
                        releaseDate: dbRow.release_date,
                        year: 2012,
                        budget: dbRow.budget,
                        overview: dbRow.overview,
                        poster: dbRow.poster,
                        fanart: dbRow.fanart
                    }
                });
            });
        });
    });
});
