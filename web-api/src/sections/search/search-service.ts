import { db } from '../../lib/db';
import { showTable, movie } from '../../contracts/database';

// Ugly as fuck
const replaceNonAlphabeticSQL = str => {
    return `replace(replace(replace(replace(${str}, '+', ''), '\\'', ''), '.' ,''), ':', '')`;
};
const replaceNonAlphabeticStr = str => str.replace(/[+.:']/g, '');

class SearchService {

    getShowSearchResultRaw(term: string): Promise<any> {
        return <any>db(showTable.$table)
            .select(
                showTable.id,
                showTable.imdb_id,
                showTable.tvdb_id,
                showTable.name,
                showTable.poster,
                showTable.fanart
            )
            .whereRaw(`${replaceNonAlphabeticSQL(showTable.name)} LIKE ?`, `%${replaceNonAlphabeticStr(term)}%`)
            .limit(20);
    }

    getMovieSearchResultRaw(term: string): Promise<any> {
        return <any>db(movie.$table)
            .select(
                movie.id,
                movie.imdbId,
                movie.tmdbId,
                movie.title,
                movie.poster,
                movie.fanart
            )
            .whereRaw(`${replaceNonAlphabeticSQL(movie.title)} LIKE ?`, `%${replaceNonAlphabeticStr(term)}%`)
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
