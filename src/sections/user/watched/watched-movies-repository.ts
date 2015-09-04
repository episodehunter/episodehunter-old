'use strict';

import {autoInject} from 'autoinject';
import {database} from '../../../lib/db';
import {as} from '../../../lib/utility/database';

interface WatchedMoviesDatabaseInterface {
    id: number;
    tmdb_id: number;
    imdb_id: string;
    title: string;
    orginal_title: string;
    release_date: string;
}

@autoInject
class WatchedMoviesRepository {

    getAll(userId: number): Promise<Array<WatchedMoviesDatabaseInterface>> {
        let model = {
            movie: database.model.movie,
            watched: database.model.watchedMovie
        };

        return database.q
            .select(
                model.movie.id,
                model.movie.tmdbId,
                model.movie.imdbId,
                model.movie.title,
                model.movie.orginalTitle,
                model.movie.releaseDate
            )
            .from(model.watched.$table)
            .leftJoin(model.movie.$table, model.movie.id, model.watched.movieId)
            .where(model.watched.userId, '=', userId)
            .then(movies => {
                if (!movies) {
                    return [];
                }
                return movies;
            });
    }

}

export {WatchedMoviesRepository};
