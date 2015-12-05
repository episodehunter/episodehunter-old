import '../set-env-var';
import {assert} from 'chai';
import {connect as createQueue} from 'episodehunter-queue';
import {watchedMovie} from '../../episodehunter-messages/database/watched-movie';
import db from '../../lib/database';
import {setMovieAsWatched} from '../../start';

const queueConfig: any = undefined;
const queue = createQueue(queueConfig);

describe('Set movie as watched', () => {

    const theMoveDb = 70160;
    const userId = 1;

    before(() => {
        queue.testMode.enter();
    });

    beforeEach(() => {
        return db(watchedMovie.$table)
            .where(watchedMovie.userId, userId)
            .del();
    });

    afterEach(() => {
        queue.testMode.clear();
    });

    after(() => {
        queue.testMode.exit();
    });

    it('Should set movie as watched if it exist', () => {
        // Arrange
        const job = {
            movie: {
                ids: {
                    theMoveDb
                }
            },
            userId: userId
        };

        // Act
        return setMovieAsWatched(job)
            .then(() => {
                return db(watchedMovie.$table)
                    .first()
                    .count(watchedMovie.id + ' as num')
                    .where(watchedMovie.userId, userId);
            })
            .then(result => {
                assert.strictEqual(result.num, 1);
            });
    });

    it('Should add the movie it it does not exist', () => {
        // Arrange
        const job = {
            movie: {
                ids: {
                    theMoveDb: 1
                }
            },
            userId: userId
        };

        // Act
        return setMovieAsWatched(job)
            .then(() => {
                console.log('Hej');
                throw new Error('Why wont you just die?');
            })
            .catch(() => {
                return db(watchedMovie.$table)
                    .first()
                    .count(watchedMovie.id + ' as num')
                    .where(watchedMovie.userId, userId);
            })
            .then(result => {
                assert.strictEqual(result.num, 0, 'It should not exist any watched movies for this user');
                assert.strictEqual(queue.testMode.jobs.length, 1, 'It should exist one job now');
                assert.strictEqual(queue.testMode.jobs[0].type, 'movie-ingest.add');
                assert.strictEqual(queue.testMode.jobs[0].data.theMoveDb, 1);
            });
    });

});
