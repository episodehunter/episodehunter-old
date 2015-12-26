import {assert} from 'chai';
import {transformMoviesFromDB} from '../../../watched-movies/transformer';

describe('Movie transformer', () => {

    describe('Transform movie from DB', () => {

        it('should extract a movie list from watched movies', () => {

            let watchedMovies = [
                {
                    id: 2,
                    tmdb_id: 5,
                    imdb_id: 'tt12345',
                    title: 'Best Movie',
                    orginal_title: 'Best Movie',
                    release_date: '2015-05-23'
                }, {
                    id: 3,
                    tmdb_id: 6,
                    imdb_id: 'tt12346',
                    title: 'Better Movie',
                    orginal_title: 'Better Movie',
                    release_date: '2003-05-23'
                }
            ];

            // Act
            let movies = transformMoviesFromDB(watchedMovies);

            // Assert
            assert.isArray(movies);
            assert.lengthOf(movies, 2);

            assert.strictEqual(movies[0].ids.id, 2);
            assert.strictEqual(movies[0].ids.theMoveDb, 5);
            assert.strictEqual(movies[0].ids.imdb, 'tt12345');
            assert.strictEqual(movies[0].title, 'Best Movie');
            assert.strictEqual(movies[0].originalTitle, 'Best Movie');
            assert.strictEqual(movies[0].year, 2015);

            assert.strictEqual(movies[1].ids.id, 3);
            assert.strictEqual(movies[1].ids.theMoveDb, 6);
            assert.strictEqual(movies[1].ids.imdb, 'tt12346');
            assert.strictEqual(movies[1].title, 'Better Movie');
            assert.strictEqual(movies[1].originalTitle, 'Better Movie');
            assert.strictEqual(movies[1].year, 2003);

        });

    });

});
