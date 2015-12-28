import {movie} from 'messages/database/movie';
import {watchedMovie} from 'messages/database/watched-movie';
import {database} from '../lib/database';

interface WatchedMoviesDatabaseInterface {
    id: number;
    tmdb_id: number;
    imdb_id: string;
    title: string;
    orginal_title: string;
    release_date: string;
}

function getWatchedMoviesFromDb(userId: number): Promise<Array<WatchedMoviesDatabaseInterface>> {
    let model = {
        movie: movie,
        watched: watchedMovie
    };

    return database
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

export {getWatchedMoviesFromDb};
export default {getWatchedMoviesFromDb};
