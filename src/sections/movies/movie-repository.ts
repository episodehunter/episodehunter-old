'use strict';

import {autoInject} from 'autoinject';
import {database} from '../../lib/db';

interface MovieDatabaseInterface {
    id: number;
    tmdb_id: number;
    imdb_id: string;
    title: string;
    orginal_title: string;
    genre: string;
    tagline: string;
    runtime: number;
    spoken_lang: string;
    companies: string;
    trailer: string;
    release_date: string;
    budget: number;
    overview: string;
    poster: string;
    fanart: string;
}

@autoInject
class MovieRepository {

    get(movieId: number): Promise<MovieDatabaseInterface> {
        const model = database.model.movie;

        return database.q
            .first(
                model.id,
                model.tmdbId,
                model.imdbId,
                model.title,
                model.orginalTitle,
                model.genre,
                model.tagline,
                model.runtime,
                model.spokenLang,
                model.companies,
                model.trailer,
                model.releaseDate,
                model.budget,
                model.overview,
                model.poster,
                model.fanart
            )
            .from(model.$table)
            .where(model.id, '=', movieId)
            .then(movie => {
                if (movie === undefined) {
                    return Promise.reject(404);
                }
                return movie;
            });
    }

}

export {MovieRepository};
