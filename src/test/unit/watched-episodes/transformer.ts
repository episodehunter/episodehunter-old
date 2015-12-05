import {assert} from 'chai';
import {WatchedShow} from 'eh-domain/model/scrobble/sync';
import {extractEpisodesFromGivenShow, transformEpisodesFromDB} from '../../../watched-episodes/transformer';
import {watchedEpisode} from '../../../episodehunter-messages/database/watched-episode';

describe('Show transformer', () => {
    let orginalDateNow = Date.now;
    let timeMock = 1441528727000;

    before(() => {
        Date.now = () => timeMock;
    });

    after(() => {
        Date.now = orginalDateNow;
    });

    describe('Transform episodes from DB', () => {

        it('should extract a show object from watched shows', () => {

            // Arrange
            let watchedEpisodes = [
                {
                    show_id: 2,
                    show_tvdb_id: 5,
                    show_imdb_id: 'tt12345',
                    show_title: 'Mr. Robot',
                    show_first_aired: '2015-05-23',
                    season: 1,
                    episode: 1
                }, {
                    show_id: 2,
                    show_tvdb_id: 5,
                    show_imdb_id: 'tt12345',
                    show_title: 'Mr. Robot',
                    show_first_aired: '2015-05-23',
                    season: 1,
                    episode: 2
                }, {
                    show_id: 2,
                    show_tvdb_id: 5,
                    show_imdb_id: 'tt12345',
                    show_title: 'Mr. Robot',
                    show_first_aired: '2015-05-23',
                    season: 2,
                    episode: 1
                }, {
                    show_id: 3,
                    show_tvdb_id: 6,
                    show_imdb_id: 'tt12346',
                    show_title: 'Dexter',
                    show_first_aired: '2003-05-23',
                    season: 1,
                    episode: 1
                }
            ];

            // Act
            let shows = transformEpisodesFromDB(watchedEpisodes);

            // Assert
            assert.isArray(shows);
            assert.lengthOf(shows, 2);
            assert.deepEqual(shows[0], {
                ids: {
                    id: 2,
                    tvdb: 5,
                    imdb: 'tt12345'
                },
                year: 2015,
                title: 'Mr. Robot',
                seasons: {
                    1: [1, 2],
                    2: [1]
                }
            });
            assert.deepEqual(shows[1], {
                ids: {
                    id: 3,
                    tvdb: 6,
                    imdb: 'tt12346'
                },
                year: 2003,
                title: 'Dexter',
                seasons: {
                    1: [1]
                }
            });

        });

    });

    describe('extractEpisodesFromGivenShow', () => {

        it(`Should extract episodes from a show`, () => {
            // Arrange
            let userId = 2;
            let showId = 5;
            let show: WatchedShow = {
                ids: {
                    id: 1,
                    tvdbId: 2,
                    imdbId: ''
                },
                year: 2015,
                title: 'mr. robot',
                seasons: {
                    '1': [1],
                    '2': [2]
                }
            };
            let expected = [{
                [watchedEpisode.userId]: userId,
                [watchedEpisode.showId]: showId,
                [watchedEpisode.season]: 1,
                [watchedEpisode.episode]: 1,
                [watchedEpisode.time]: 1441528727,
                [watchedEpisode.type]: 1
            }, {
                [watchedEpisode.userId]: userId,
                [watchedEpisode.showId]: showId,
                [watchedEpisode.season]: 2,
                [watchedEpisode.episode]: 2,
                [watchedEpisode.time]: 1441528727,
                [watchedEpisode.type]: 1
            }];

            // Act
            let episodes = extractEpisodesFromGivenShow(show, showId, userId);

            // Assert
            assert.isArray(episodes);
            assert.lengthOf(episodes, 2);
            assert.deepEqual(episodes[0], expected[0]);
            assert.deepEqual(episodes[1], expected[1]);
        });

        it(`Should skip episodes that has a non-numric episode number`, () => {
            // Arrange
            let userId = 2;
            let showId = 5;
            let show: any = {
                ids: {
                    id: 1,
                    tvdbId: 2,
                    imdbId: ''
                },
                year: 2015,
                title: 'mr. robot',
                seasons: {
                    '1': [1, '2d']
                }
            };
            let expected = [{
                [watchedEpisode.userId]: userId,
                [watchedEpisode.showId]: showId,
                [watchedEpisode.season]: 1,
                [watchedEpisode.episode]: 1,
                [watchedEpisode.time]: 1441528727,
                [watchedEpisode.type]: 1
            }];

            // Act
            let episodes = extractEpisodesFromGivenShow(show, showId, userId);

            // Assert
            assert.isArray(episodes);
            assert.lengthOf(episodes, 1);
            assert.deepEqual(episodes[0], expected[0]);
        });

        it(`Should skip all episodes if userid is non-numric`, () => {
            // Arrange
            let userId;
            let showId = 5;
            let show: any = {
                ids: {
                    id: 1,
                    tvdbId: 2,
                    imdbId: ''
                },
                year: 2015,
                title: 'mr. robot',
                seasons: {
                    '1': [1]
                }
            };

            // Act
            let episodes = extractEpisodesFromGivenShow(show, showId, userId);

            // Assert
            assert.isArray(episodes);
            assert.lengthOf(episodes, 0);
        });

        it(`Should skip all episodes if showId is non-numric`, () => {
            // Arrange
            let userId = 2;
            let showId;
            let show: any = {
                ids: {
                    id: 1,
                    tvdbId: 2,
                    imdbId: ''
                },
                year: 2015,
                title: 'mr. robot',
                seasons: {
                    '1': [1]
                }
            };

            // Act
            let episodes = extractEpisodesFromGivenShow(show, showId, userId);

            // Assert
            assert.isArray(episodes);
            assert.lengthOf(episodes, 0);
        });
    });
});
