import '../../set-env-var';
import {assert} from 'chai';
import {mockDb} from '../helper/database';
import {headers, loginIfTrying} from '../helper/auth';
import {server} from '../server';

describe('Watched', () => {
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

    describe('Series', () => {
        const url = '/user/watched/series';

        it(`Should get unauthorized response if trying to fetch watched series with invalid token`, () => {
            const options: any = {
                method: 'GET',
                url: url,
                headers: {
                    Authorization: 'bad-token'
                }
            };

            return server.injectThen(options)
                .then(response => {
                    assert.equal(response.statusCode, 401);
                });
        });

        it(`Should return an empty array if no watched series exists`, () => {
            const options: any = {
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
                    assert.equal(response.statusCode, 200);
                    assert.isArray(response.result.series);
                    assert.lengthOf(response.result.series, 0);
                });
        });

        it(`Should return a list of watched series when asking for it`, () => {
            const options: any = {
                method: 'GET',
                url: url,
                headers: headers
            };

            const dbRow = [{
                show_id: 1,
                show_tvdb_id: 2,
                show_imdb_id: 'tt12345',
                show_title: 'Dexter',
                show_first_aired: '2015-06-17',
                episode: 1,
                season: 1
            }, {
                show_id: 1,
                show_tvdb_id: 2,
                show_imdb_id: 'tt12345',
                show_title: 'Dexter',
                show_first_aired: '2015-06-17',
                episode: 2,
                season: 1
            }, {
                show_id: 1,
                show_tvdb_id: 2,
                show_imdb_id: 'tt12345',
                show_title: 'Dexter',
                show_first_aired: '2015-06-17',
                episode: 1,
                season: 2
            }, {
                show_id: 2,
                show_tvdb_id: 3,
                show_imdb_id: 'tt12346',
                show_title: 'Game Of Thrones',
                show_first_aired: '2014-06-17',
                episode: 1,
                season: 1
            }];

            tracker.on('query', query => {
                if (loginIfTrying(query)) {
                    return;
                }
                query.response(dbRow);
            });

            return server.injectThen(options)
                .then(response => {
                    const result = response.result;
                    assert.equal(response.statusCode, 200);
                    assert.deepEqual(result, {
                        series: [{
                            ids: {
                                id: dbRow[0].show_id,
                                tvdb: dbRow[0].show_tvdb_id,
                                imdb: dbRow[0].show_imdb_id
                            },
                            title: dbRow[0].show_title,
                            year: 2015,
                            seasons: {
                                '1': [1, 2],
                                '2': [1]
                            }
                        }, {
                            ids: {
                                id: dbRow[3].show_id,
                                tvdb: dbRow[3].show_tvdb_id,
                                imdb: dbRow[3].show_imdb_id
                            },
                            title: dbRow[3].show_title,
                            year: 2014,
                            seasons: {
                                '1': [1]
                            }}]
                    });
            });
        });
    });

    describe('Movies', () => {
        const url = '/user/watched/movies';

        it(`Should get unauthorized response if trying to fetch watched movies with invalid token`, () => {
            const options: any = {
                method: 'GET',
                url: url,
                headers: {
                    Authorization: 'bad-token'
                }
            };

            return server.injectThen(options)
                .then(response => {
                    assert.equal(response.statusCode, 401);
                });
        });

        it(`Should return an empty array if no watched movies exists`, () => {
            const options: any = {
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
                    assert.equal(response.statusCode, 200);
                    assert.isArray(response.result.movies);
                    assert.lengthOf(response.result.movies, 0);
                });
        });

        it(`Should return a list of watched movies when asking for it`, () => {
            const options: any = {
                method: 'GET',
                url: url,
                headers: headers
            };

            const dbRow = [{
                id: 1,
                tmdb_id: 2,
                imdb_id: 'tt12345',
                title: 'Best movie',
                orginal_title: 'Best movie',
                release_date: '2015-08-30'
            }];

            tracker.on('query', query => {
                if (loginIfTrying(query)) {
                    return;
                }
                query.response(dbRow);
            });

            return server.injectThen(options)
                .then(response => {
                    const result = response.result;
                    assert.equal(response.statusCode, 200);
                    assert.deepEqual(result, {
                        movies: [{
                            ids: {
                                id: dbRow[0].id,
                                theMoveDb: dbRow[0].tmdb_id,
                                imdb: dbRow[0].imdb_id
                            },
                            title: dbRow[0].title,
                            orginalTitle: dbRow[0].title,
                            year: 2015,
                        }]
                    });
            });
        });
    });
});
