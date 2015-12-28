import '../set-env-var';
import {assert} from 'chai';
import {watchedEpisode} from 'messages/database/watched-episode';
import db from '../../lib/database';
import {getWatchedShows} from '../../start';

describe('Get watched episodes', () => {

    const showId = 6;
    const userId = 1;

    beforeEach(() => {
        return db(watchedEpisode.$table)
            .where(watchedEpisode.userId, userId)
            .del();
    });

    it('Should get watched episodes', () => {
        // Arrange
        const job = { userId };

        // Act
        return db(watchedEpisode.$table)
            .insert([{
                [watchedEpisode.userId]: userId,
                [watchedEpisode.showId]: showId,
                [watchedEpisode.season]: 1,
                [watchedEpisode.episode]: 2,
                [watchedEpisode.time]: 1449330223,
                [watchedEpisode.type]: 1
            }])
            .then(() => getWatchedShows(job))
            .then(result => {
                const show = result[0];
                assert.strictEqual(result.length, 1, 'It should only be one watched episode');
                assert.strictEqual(show.ids.id, showId);
                assert.strictEqual(show.year, 2006);
                assert.strictEqual(show.title, 'Dexter');
                assert.strictEqual(Object.keys(show.seasons).length, 1, 'The user should only have seen episodes from one season');
                assert.strictEqual(show.seasons['1'].length, 1, 'The user should only have seen one episode');
                assert.strictEqual(show.seasons['1'][0], 2, 'The user should only have seen one episode');
            });
    });

    it(`Should get an empy array if use don't have seen any episodes`, () => {
        // Arrange
        const job = { userId };

        // Act
        return getWatchedShows(job)
            .then(result => {
                assert.strictEqual(Array.isArray(result), true, 'It should be an array');
                assert.strictEqual(result.length, 0, 'It should not exist any watched episode for this user');
            });
    });

});
