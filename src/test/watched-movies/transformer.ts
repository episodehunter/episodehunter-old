import {assert} from 'chai';
import {transformMoviesFromDB} from '../../watched-movies/transformer';

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
            assert.deepEqual(movies[0], {
                ids: {
                    id: 2,
                    theMoveDb: 5,
                    imdb: 'tt12345'
                },
                year: 2015,
                title: 'Best Movie',
                orginalTitle: 'Best Movie'
            });
            assert.deepEqual(movies[1], {
                ids: {
                    id: 3,
                    theMoveDb: 6,
                    imdb: 'tt12346'
                },
                year: 2003,
                title: 'Better Movie',
                orginalTitle: 'Better Movie'
            });

        });

    });

});
