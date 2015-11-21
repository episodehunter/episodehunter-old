'use strict';

import {autoInject} from 'autoinject';
import {MovieIds} from 'eh-domain/model/ids';
import logger from './lib/logger';
import MovieDbRepository from './moviedb/moviedb-repository';
import DatabaseRepository from './database.repository';
import imageService from './image.service';

@autoInject
class MovieService {

    movieDbRepo: MovieDbRepository;
    db: DatabaseRepository;

    constructor(movieDbRepo: MovieDbRepository, db: DatabaseRepository) {
        this.movieDbRepo = movieDbRepo;
        this.db = db;
    }

    async addNewMovie(ids: MovieIds): Promise<any> {
        const {tmdbId} = ids;

        if (await this.db.movieExistWithMovieDbId(tmdbId)) {
            logger.info(`Movie alrady exist, movie-db-id: ${tmdbId}`);
            return;
        }

        return await this.movieDbRepo
            .getMovie(tmdbId)
            .then(movie => this.db.insertMovie(movie))
            .then(imageService.requestDownload);
    }

    async updateMovie(ids: MovieIds): Promise<any> {
        const {tmdbId} = ids;

        const movieId = await this.db.getMovieIdByMovieDbId(tmdbId);
        if (!movieId) {
            return Promise.reject('Movie do not exist');
        }

        return this.movieDbRepo
            .getMovie(tmdbId)
            .then(movie => this.db.updateMovie(movieId, movie))
            .then(imageService.requestDownload);
    }

}

export {MovieService};
export default MovieService;
