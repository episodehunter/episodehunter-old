'use strict';

import {extractYear} from '../lib/utility';

/**
 * Transform watched movies in the database to a more readable structure
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
            title: movie.title,
            // There is a typo in the database, damn legazy db
            originalTitle: movie.orginal_title
        };
    });
}

export {transformMoviesFromDB};
export default {transformMoviesFromDB};
