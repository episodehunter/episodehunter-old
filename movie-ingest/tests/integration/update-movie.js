import {assert} from 'chai';
import {connect as createQueue} from 'episodehunter-queue';
import {movie as movieTable} from 'messages/database/movie';
import {updateMovie} from '../../dist/start';
import logger from '../../dist/lib/logger';
import database from '../../dist/lib/database';
import MovieDbRepository from '../../dist/moviedb/moviedb-repository';
import mockMovie from '../testdata/mock-movie.json';

const queue = createQueue();
logger.info = () => {};

const httpGetMock = url => {
    if (url.substr(0, 50) === 'https://api.themoviedb.org/3/movie/206647?api_key=') {
        return Promise.resolve({body: mockMovie});
    } else {
        throw new Error('Unexpected url: ' + url);
    }
};

MovieDbRepository.inject = [httpGetMock];

describe('Update Spectre', () => {

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

    it('Should update Spectre', async () => {
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
                [movieTable.title]: 'Bond',
                [movieTable.orginalTitle]: 'Bond',
                [movieTable.genre]: '',
                [movieTable.tagline]: '',
                [movieTable.runtime]: 0,
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
        const success = await updateMovie(job);

        // Assert
        const movies = await db(movieTable.$table)
            .select()
            .where(movieTable.tmdbId, tmdbId);

        const movie = movies[0];
        assert.lengthOf(movies, 1);
        assert.isTrue(success);
        assert.strictEqual(queue.testMode.jobs.length, 2);
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

});
