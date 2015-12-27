'use strict';

import Knex from 'knex';
import {movie as movieTable} from 'messages/database/movie';
import database from './lib/database';
import MovieDbMovie from './moviedb/moviedb.model';
import transformer from './moviedb.transformer';

class MovieDbRepository {
    db: Knex;

    constructor(db = database) {
        this.db = db.connect();
    }

    movieExistWithMovieDbId(movieDbId: number): Promise<boolean> {
        return this.getMovieIdByMovieDbId(movieDbId)
            .then(id => !!id);
    }

    getMovieIdByMovieDbId(movieDbId: number): Promise<number> {
        return this.db
            .first(movieTable.id)
            .from(movieTable.$table)
            .where(movieTable.tmdbId, movieDbId)
            .then(result => result ? result.id : undefined);
    }

    updateMovie(id: number, movie: MovieDbMovie) {
        return this.db(movieTable.$table)
            .where(movieTable.id, id)
            .update(
                transformer.transformMovieForDbInsert(movie)
            )
            .then(() => movie);
    }

    insertMovie(movie: MovieDbMovie) {
        return this.db
            .insert(
                transformer.transformMovieForDbInsert(movie)
            )
            .into(movieTable.$table)
            .then(() => movie);
    }

}

export default MovieDbRepository;
export {MovieDbRepository};
