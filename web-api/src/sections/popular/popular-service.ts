import {scrobbleTypes} from 'messages/constant/scrobble-types';
import dateUtil from '../../lib/utility/dates';
import {PopularShows} from './model/shows';
import {database} from '../../lib/db';

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
        const model = {
            watched: database.model.watchedEpisode,
            show: database.model.show
        };

        const query = database.q(model.watched.$table)
            .select(model.show.id, model.show.imdbId, model.show.tvdbId, model.show.title, model.show.poster, model.show.fanart)
            .select(database.q.raw(`count(${model.watched.showId}) * count(DISTINCT ${model.watched.userId}) as r`))
            .count(model.watched.showId + ' as views')
            .join(model.show.$table, model.watched.showId, model.show.id);

        if (time > 0) {
            query.where(model.watched.time, '>', time);
            query.where(function() {
                this.where(model.watched.type, scrobbleTypes.checkIn).orWhere(model.watched.type, scrobbleTypes.xbmcScrobble)
            });
            query.orderBy('r', 'DESC');
        } else {
            query.orderBy('views', 'DESC');
        }

        return query
            .groupBy(model.watched.showId)
            .limit(100);
    }

    getPopularMoviesRaw(since: string): Promise<any> {
        const time = this.convertToTimestamp(since);
        const model = {
            watched: database.model.watchedMovie,
            movie: database.model.movie
        };

        const query = database.q(model.watched.$table)
            .select(model.movie.id, model.movie.imdbId, model.movie.tmdbId, model.movie.title, model.movie.poster, model.movie.fanart)
            .count(model.watched.movieId + ' as views')
            .join(model.movie.$table, model.watched.movieId, model.movie.id);

        if (time > 0) {
            query.where(model.watched.time, '>', time);
            query.where(function() {
                this.where(model.watched.type, scrobbleTypes.checkIn).orWhere(model.watched.type, scrobbleTypes.xbmcScrobble)
            });
        }

        return query
            .orderBy('views', 'DESC')
            .groupBy(model.watched.movieId)
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

export {PopularService};
