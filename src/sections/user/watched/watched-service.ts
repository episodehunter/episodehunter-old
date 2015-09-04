import {chain, pluck} from 'lodash';
import {autoInject} from 'autoinject';
import {extractYear} from '../../../lib/utility/dates';
import {queue, jobNames} from '../../../lib/queue';
import {WatchedMovies} from './model/watched-movies';
import {WatchedSeries} from './model/watched-series';
import {WatchedMoviesRepository} from './watched-movies-repository';
import {WatchedSeriesRepository, WatchedSeriesDatabaseInterface} from './watched-series-repository';


@autoInject
class WatchedService {

    watchedMoviesRepo: WatchedMoviesRepository;
    watchedSeriesRepo: WatchedSeriesRepository;

    constructor(
        watchedMoviesRepo: WatchedMoviesRepository,
        watchedSeriesRepo: WatchedSeriesRepository
    ) {
        this.watchedMoviesRepo = watchedMoviesRepo;
        this.watchedSeriesRepo = watchedSeriesRepo;
    }

    getWatchedMovies(userId: number): Promise<WatchedMovies[]> {
        return this.watchedMoviesRepo
            .getAll(userId)
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

    getWatchedSeries(userId: number): Promise<WatchedSeries[]> {
        return this.watchedSeriesRepo
            .getAll(userId)
            .then(data => {
                return <any>chain(data)
                    .groupBy('show_id')
                    .map(series => {
                        return {
                            ids: {
                                id: series[0].show_id,
                                tvdb: series[0].show_tvdb_id,
                                imdb: series[0].show_imdb_id
                            },
                            year: extractYear(series[0].show_first_aired),
                            title: series[0].show_title,
                            seasons: chain(series)
                                .groupBy('season')
                                .mapValues((episodes: any) => pluck(episodes, 'episode'))
                                .value()
                        };
                    })
                    .value();
            });
        }

    setShowsAsWatched(userId: number, shows: WatchedSeries[]) {
        shows.forEach(show => {
            queue.create(jobNames.watchedAdd, {userId, show}).save();
        })
    }


}

export {WatchedService};
