'use strict';

import {assert} from 'chai';
import {createQueue} from 'kue';
import {addMovie} from '../../dist/start';
import logger from '../../dist/lib/logger';
import {movie as movieTable} from '../../dist/episodehunter-messages/database/movie';
import database from '../../dist/lib/database';
import MovieDbRepository from '../../dist/moviedb/moviedb-repository';
import mockMovie from '../testdata/mock-movie.json';
import mockTrailer from '../testdata/mock-trailer.json';

const queue = createQueue();
logger.info = () => {};

const httpGetMock = url => {
    if (url.substr(0, 50) === 'https://api.themoviedb.org/3/movie/206647?api_key=') {
        return Promise.resolve({body: mockMovie});
    } else if (url.substr(0, 57) === 'https://api.themoviedb.org/3/movie/206647/videos?api_key=') {
        return Promise.resolve({body: mockTrailer});
    } else {
        throw new Error('Unexpected url: ' + url);
    }
};

MovieDbRepository.inject = [httpGetMock];

describe('Add Spectre', () => {

    const tmdbId = 206647;
    const db = database.connect();

    before(() => {
        queue.testMode.enter();
    });

    after(() => {
        queue.testMode.exit();
    });

    afterEach(() => {
        queue.testMode.clear();
    });

    beforeEach(async () => {
        // Set db in a known state
        await db(movieTable.$table)
            .where(movieTable.tmdbId, tmdbId)
            .del();
    });

    it('Should add Spectre', async () => {
        // Arrange
        const job = {
            id: 1,
            data: {
                ids: {tmdbId}
            }
        };

        // Act
        const success = await addMovie(job);

        // Assert
        const movie = await db(movieTable.$table)
            .first()
            .where(movieTable.tmdbId, tmdbId);

        assert.isTrue(success);
        assert.isNumber(movie.id);
        assert.strictEqual(movie.tmdb_id, tmdbId);
        assert.strictEqual(movie.imdb_id, 'tt2379713');
        assert.strictEqual(movie.title, 'Spectre');
        assert.strictEqual(movie.orginal_title, 'Spectre');
        assert.strictEqual(movie.genre, '["Action","Adventure","Crime"]');
        assert.strictEqual(movie.tagline, 'nice tagline');
        assert.strictEqual(movie.runtime, 148);
        assert.strictEqual(movie.spoken_lang, '["English"]');
        assert.strictEqual(movie.companies, '["Eon Productions"]');
        assert.strictEqual(movie.trailer, 'BOVriTeIypQ');
        assert.strictEqual(movie.release_date, '2015-11-06');
        assert.strictEqual(movie.budget, 300000000);
        assert.strictEqual(movie.overview.substr(0, 20), 'A cryptic message fr');
        assert.strictEqual(movie.poster, '');
        assert.strictEqual(movie.fanart, '');
        assert(movie.last_update > 1448107656,  'last update');
    });

    it('Should not add anything if movie already exist', async () => {
        // Arrange
        const job = {
            id: 1,
            data: {
                ids: {tmdbId}
            }
        };
        await db(movieTable.$table)
            .insert({
                [movieTable.tmdbId]: tmdbId,
                [movieTable.imdbId]: '',
                [movieTable.title]: 'Spectre',
                [movieTable.orginalTitle]: 'Spectre',
                [movieTable.genre]: '',
                [movieTable.tagline]: '',
                [movieTable.runtime]: 120,
                [movieTable.companies]: '',
                [movieTable.trailer]: '',
                [movieTable.releaseDate]: '',
                [movieTable.budget]: '',
                [movieTable.overview]: '',
                [movieTable.poster]: '',
                [movieTable.fanart]: '',
                [movieTable.lastUpdate]: 0
            });

        // Act
        const success = await addMovie(job);

        // Assert
        assert(success === undefined);
    });

    it('Should request to download images when adding Spectre', async () => {
        // Arrange
        const job = {
            id: 1,
            data: {
                ids: {tmdbId}
            }
        };

        // Act
        const success = await addMovie(job);

        // Assert
        assert.isTrue(success);
        assert.strictEqual(queue.testMode.jobs.length, 2);
    });

});
