'use strict';

import {WatchedMovie, WatchedMovieDatabase} from 'eh-domain/model/scrobble/sync';
import {movie} from 'messages/database/movie';
import {watchedMovie} from 'messages/database/watched-movie';
import {scrobbleTypes} from 'messages/constant/scrobble-types';
import {database} from '../lib/database';
import {now, isNumric} from '../lib/utility';
import {catchDbError, rejectIfNoResult} from '../lib/error-handler';

function getMovieIdByTheMoveDbId(theMoveDbId: number): Promise<number> {
    if (!isNumric(theMoveDbId)) {
        return Promise.reject('Invalid theMoveDbId');
    }

    return database
        .first(movie.id)
        .from(movie.$table)
        .where(movie.tmdbId, theMoveDbId)
        .catch(catchDbError)
        .then(rejectIfNoResult)
        .then(result => result.id);
}

function getMovieIdByImdbId(imdbId: string): Promise<number> {
    if (typeof imdbId === 'string') {
        return Promise.reject('Invalid imdbId');
    }

    return database
        .first(movie.id)
        .from(movie.$table)
        .where(movie.imdbId, imdbId)
        .catch(catchDbError)
        .then(rejectIfNoResult)
        .then(result => result.id);
}

function getMovieById(id: number): Promise<number> {
    if (!isNumric(id)) {
        return Promise.reject('Invalid id');
    }

    return database
        .first(movie.id)
        .from(movie.$table)
        .where(movie.id, id)
        .catch(catchDbError)
        .then(rejectIfNoResult)
        .then(result => result.id);
}

function setMovieAsWatched(movie: WatchedMovieDatabase): Promise<void> {
    return database
        .insert(movie)
        .into(watchedMovie.$table)
        .catch(catchDbError);
}

function prepareMovie(movie: WatchedMovie, movieId: number, userId: number): WatchedMovieDatabase {
    return <WatchedMovieDatabase>{
        [watchedMovie.userId]: userId,
        [watchedMovie.movieId]: movieId,
        [watchedMovie.time]: now(),
        [watchedMovie.type]: scrobbleTypes.xbmcSync
    };
}

const movieRepository = {
    getMovieIdByTheMoveDbId,
    getMovieIdByImdbId,
    getMovieById,
    setMovieAsWatched,
    prepareMovie
};

export {movieRepository};
