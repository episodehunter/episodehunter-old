import { scrobbleTypes } from 'messages/constant/scrobble-types';
import { showTable, watchedEpisode, movie, watchedMovie } from '../../contracts/database';
import * as dateUtil from '../../lib/utility/dates';
import { db } from '../../lib/db';

class PopularService {

    convertToTimestamp(since: string): number {
        if (!since) {
            return 0;
        }
        const date = new Date(since);
        return dateUtil.isValid(date) ? dateUtil.convertToUnixTimestamp(date) : 0;
    }

    getPopularShowsRaw(since: string): Promise<any> {
        const time = this.convertToTimestamp(since);

        const query = db(watchedEpisode.$table)
            .select(
                showTable.id,
                showTable.imdb_id,
                showTable.tvdb_id,
                showTable.name,
                showTable.poster,
                showTable.fanart,
                db.raw(`count(${watchedEpisode.showId}) * count(DISTINCT ${watchedEpisode.userId}) as r`)
            )
            .count(watchedEpisode.showId + ' as views')
            .join(showTable.$table, watchedEpisode.showId, showTable.id);

        if (time > 0) {
            query.where(watchedEpisode.time, '>', time);
            query.where(function() {
                this.where(
                    watchedEpisode.type, scrobbleTypes.checkIn
                ).orWhere(
                    watchedEpisode.type, scrobbleTypes.xbmcScrobble
                );
            });
            query.orderBy('r', 'DESC');
        } else {
            query.orderBy('views', 'DESC');
        }

        return <any>query
            .groupBy(watchedEpisode.showId)
            .limit(100);
    }

    getPopularMoviesRaw(since: string): Promise<any> {
        const time = this.convertToTimestamp(since);

        const query = db(watchedMovie.$table)
            .select(
                movie.id,
                movie.imdbId,
                movie.tmdbId,
                movie.title,
                movie.poster,
                movie.fanart
            )
            .count(watchedMovie.movieId + ' as views')
            .join(movie.$table, watchedMovie.movieId, movie.id);

        if (time > 0) {
            query.where(watchedMovie.time, '>', time);
            query.where(function() {
                this.where(
                    watchedMovie.type, scrobbleTypes.checkIn
                ).orWhere(
                    watchedMovie.type, scrobbleTypes.xbmcScrobble
                );
            });
        }

        return <any>query
            .orderBy('views', 'DESC')
            .groupBy(watchedMovie.movieId)
            .limit(100);
    }

    getPopularShows(since: string): Promise<any> {
        return this.getPopularShowsRaw(since)
            .then(shows => {
                if (shows === undefined) {
                    return [];
                }
                return shows;
            })
            .then(shows => {
                return shows.map(show => {
                    return {
                        ids: {
                            id: show.id,
                            tvdb: show.tvdb_id,
                            imdb: show.imdb_id
                        },
                        title: show.name,
                        poster: show.poster,
                        fanart: show.fanart,
                        views: show.views
                    };
                });
            });
    }

    getPopularMovies(since: string): Promise<any> {
        return this.getPopularMoviesRaw(since)
            .then(movies => {
                if (movies === undefined) {
                    return [];
                }
                return movies;
            })
            .then(movies => {
                return movies.map(movie => {
                    return {
                        ids: {
                            id: movie.id,
                            theMovieDb: movie.tmdb_id,
                            imdb: movie.imdb_id
                        },
                        title: movie.title,
                        poster: movie.poster,
                        fanart: movie.fanart,
                        views: movie.views
                    };
                });
            });
    }

}

export { PopularService };
