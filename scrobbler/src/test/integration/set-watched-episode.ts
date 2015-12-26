import '../set-env-var';
import {assert} from 'chai';
import {connect as createQueue} from 'episodehunter-queue';
import {watchedEpisode} from '../../episodehunter-messages/database/watched-episode';
import db from '../../lib/database';
import {setShowAsWatched} from '../../start';

const queueConfig: any = undefined;
const queue = createQueue(queueConfig);

describe('Set episode as watched', () => {

    const theTvDbId = 79349;
    const userId = 1;

    before(() => {
        queue.testMode.enter();
    });

    beforeEach(() => {
        return db(watchedEpisode.$table)
            .where(watchedEpisode.userId, userId)
            .del();
    });

    afterEach(() => {
        queue.testMode.clear();
    });

    after(() => {
        queue.testMode.exit();
    });

    it('Should set episode as watched if show exist', () => {
        // Arrange
        const job = {
            show: {
                ids: {
                    tvdbId: theTvDbId
                },
                seasons: {
                    '1': [1, 2],
                    '2': [1]
                }
            },
            userId: userId
        };

        // Act
        return setShowAsWatched(job)
            .then(() => {
                return db(watchedEpisode.$table)
                    .first()
                    .count(watchedEpisode.id + ' as num')
                    .where(watchedEpisode.userId, userId);
            })
            .then(result => {
                assert.strictEqual(result.num, 3);
            });
    });

    it('Should add the show if it does not exist', () => {
        // Arrange
        const job = {
            show: {
                ids: {
                    tvdbId: 1
                },
                seasons: {
                    '1': [1, 2],
                    '2': [1]
                }
            },
            userId: userId
        };

        // Act
        return setShowAsWatched(job)
            .then(() => {
                throw new Error('Why wont you just die?');
            })
            .catch(() => {
                return db(watchedEpisode.$table)
                    .first()
                    .count(watchedEpisode.id + ' as num')
                    .where(watchedEpisode.userId, userId);
            })
            .then(result => {
                assert.strictEqual(result.num, 0, 'It should not exist any watched episode for this user');
                assert.strictEqual(queue.testMode.jobs.length, 1, 'It should exist one job now');
                assert.strictEqual(queue.testMode.jobs[0].type, 'show-ingest.add');
                assert.strictEqual(queue.testMode.jobs[0].data.tvdbId, 1);
            });
    });

});
