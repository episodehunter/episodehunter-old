import {assert} from 'chai';
import {extractEpisodes} from '../../watched-episodes/set-watched.repository';
import {WatchedShow} from 'eh-domain/model/scrobble/sync';
import {watchedEpisode} from '../../episodehunter-messages/database/watched-episode';

describe('Watched show service', () => {
    let orginalDateNow = Date.now;
    let timeMock = 1441528727000;

    before(() => {
        Date.now = () => timeMock;
    });

    after(() => {
        Date.now = orginalDateNow;
    });

    describe('extractEpisodes', () => {

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
            let episodes = extractEpisodes(show, showId, userId);

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
                    '1': [1, '2d'],
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
            let episodes = extractEpisodes(show, showId, userId);

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
                    '1': [1],
                }
            };

            // Act
            let episodes = extractEpisodes(show, showId, userId);

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
                    '1': [1],
                }
            };

            // Act
            let episodes = extractEpisodes(show, showId, userId);

            // Assert
            assert.isArray(episodes);
            assert.lengthOf(episodes, 0);
        });
    });
});
