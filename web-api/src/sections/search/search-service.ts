import {database} from '../../lib/db';

// Ugly as fuck
const replaceNonAlphabeticSQL = str => {
    return `replace(replace(replace(replace(${str}, '+', ''), '\\'', ''), '.' ,''), ':', '')`;
};
const replaceNonAlphabeticStr = str => str.replace(/[+.:']/g, '');

class SearchService {

    getShowSearchResultRaw(term: string): Promise<any> {
        const model = {
            show: database.model.show
        };

        return database.q(model.show.$table)
            .select(model.show.id, model.show.imdbId, model.show.tvdbId, model.show.title, model.show.poster, model.show.fanart)
            .whereRaw(`${replaceNonAlphabeticSQL(model.show.title)} LIKE ?`, `%${replaceNonAlphabeticStr(term)}%`)
            .limit(20);
    }

    getMovieSearchResultRaw(term: string): Promise<any> {
        const model = {
            movie: database.model.movie
        };

        return database.q(model.movie.$table)
            .select(model.movie.id, model.movie.imdbId, model.movie.tmdbId, model.movie.title, model.movie.poster, model.movie.fanart)
            .whereRaw(`${replaceNonAlphabeticSQL(model.movie.title)} LIKE ?`, `%${replaceNonAlphabeticStr(term)}%`)
            .limit(20);
    }

    searchShow(term: string): Promise<any> {
        return this.getShowSearchResultRaw(term)
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
                        fanart: show.fanart
                    };
                });
            });
    }

    searchMovie(tern: string): Promise<any> {
        return this.getMovieSearchResultRaw(tern)
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
                        fanart: movie.fanart
                    };
                });
            });
    }

    search(term: string) {
        return Promise.all([this.searchMovie(term), this.searchShow(term)])
            .then(([movies, shows]) => ({ shows, movies }));
    }

}

export {SearchService};
