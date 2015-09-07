import {WatchedMovie} from 'eh-domain/model/scrobble/sync';
import {extractYear} from '../lib/utility';
import {getWatchedMoviesFromDb} from './get.repository';

function getWatchedMovies(userId: number): Promise<WatchedMovie[]> {
    return getWatchedMoviesFromDb(userId)
            .then(data => {
                return data.map(movie => {
                    return {
                        ids: {
                            id: movie.id,
                            theMoveDb: movie.tmdb_id,
                            imdb: movie.imdb_id
                        },
                        year: extractYear(movie.release_date),
                        title: movie.orginal_title,
                        orginalTitle: movie.title
                    };
                })
            });
}

let getWatchedMoviesService = {
    getWatchedMovies
}

export {getWatchedMoviesService};
