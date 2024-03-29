import '../../set-env-var';
import {assert} from 'chai';
import {mockDb} from '../helper/database';
import {headers, loginIfTrying} from '../helper/auth';
import {server} from '../server';

describe('Series', () => {
    let tracker;
    const url = '/user/upcoming/episodes';

    before(() => {
        tracker = mockDb();
    });

    beforeEach(() => {
        tracker.install();
    });

    afterEach(() => {
        tracker.uninstall();
    });

    describe('Upcoming', () => {

        it(`Should get unauthorized response if trying to fetch upcoming with invalid token`, () => {
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

        it(`Should return an empty array if no upcoming series exists`, () => {
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
                    assert.isArray(response.result.episodes);
                    assert.lengthOf(response.result.episodes, 0);
                });
        });

        it(`Should return a list of upcoming episodes when asking for it`, () => {
            const options: any = {
                method: 'GET',
                url: url,
                headers: headers
            };

            const dbRow = [{
                id: 2,
                thumbnail: 'thumbnail.jpg',
                title: 'Surprise Motherfucka',
                show_id: 5,
                show_title: 'Dexter',
                show_first_aired: '2004-09-21',
                show_poster: 'poster.jpg',
                show_fanart: 'fanart.jpg',
                season: 1,
                episode: 3,
                airs: '2004-09-21'
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
                        episodes: [{
                            ids: {
                                id: dbRow[0].id
                            },
                            title: dbRow[0].title,
                            season: dbRow[0].season,
                            episode: dbRow[0].episode,
                            airs: dbRow[0].airs,
                            thumbnail: dbRow[0].thumbnail,
                            show: {
                                ids: {
                                    id: dbRow[0].show_id
                                },
                                title: dbRow[0].show_title,
                                year: 2004,
                                poster: dbRow[0].show_poster,
                                fanart: dbRow[0].show_fanart
                            }
                        }]
                    });
            });
        });
    });
});
