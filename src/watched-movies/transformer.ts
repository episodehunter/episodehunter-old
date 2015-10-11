import {extractYear} from '../lib/utility';

/**
 * Transform watched movies in the database to a more readible structure
 */
function transformMoviesFromDB(data: Array<any>) {
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
    });
}

export {
    transformMoviesFromDB
};
