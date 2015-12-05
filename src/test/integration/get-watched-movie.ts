import '../set-env-var';
import {assert} from 'chai';
import {watchedMovie} from '../../episodehunter-messages/database/watched-movie';
import db from '../../lib/database';
import {getWatchedMovies} from '../../start';

describe('Get watched movies', () => {

    const movieId = 14;
    const userId = 1;

    beforeEach(() => {
        return db(watchedMovie.$table)
            .where(watchedMovie.userId, userId)
            .del();
    });

    it('Should get watched movies', () => {
        // Arrange
        const job = { userId };

        // Act
        return db(watchedMovie.$table)
            .insert([{
                [watchedMovie.userId]: userId,
                [watchedMovie.movieId]: movieId,
                [watchedMovie.time]: 1449330223,
                [watchedMovie.type]: 1
            }])
            .then(() => getWatchedMovies(job))
            .then(result => {
                const movie = result[0];
                assert.strictEqual(result.length, 1, 'It should only be one watched movie');
                assert.strictEqual(movie.ids.id, movieId);
                assert.strictEqual(movie.year, 1995);
                assert.strictEqual(movie.title, 'Heat');
                assert.strictEqual(movie.originalTitle, 'Heat');
            });
    });

    it(`Should get an empy array if user don't have seen any movies`, () => {
        // Arrange
        const job = { userId };

        // Act
        return getWatchedMovies(job)
            .then(result => {
                assert.strictEqual(Array.isArray(result), true, 'It should be an array');
                assert.strictEqual(result.length, 0, 'It should not exist any watched movies for this user');
            });
    });

});
