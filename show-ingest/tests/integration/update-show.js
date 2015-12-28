import '../set-env-var';
import {assert} from 'chai';
import {show} from 'messages/database/show';
import {updateShow} from '../../dist/start';
import database from '../../dist/lib/database';
import TvDbRepository from '../../dist/thetvdb/tvdb-repository';
import {trueblood} from '../testdata/trueblood';

let httpGetMock = () => {
    return Promise.resolve({body: trueblood});
};
TvDbRepository.inject = [httpGetMock];

describe('Update trueblood', () => {

    const tvdbId = 82283;
    const db = database.connect();

    beforeEach(async () => {
        // Set db in a known state
        await db(show.$table)
            .where(show.tvdbId, tvdbId)
            .del();
    });

    it('Should update trueblood from mock data', async () => {
        // Arrange
        await db(show.$table)
            .insert({
                [show.tvdbId]: tvdbId,
                [show.imdbId]: '',
                [show.title]: 'True Blood',
                [show.airs.dayOfWeek]: '',
                [show.airs.time]: '',
                [show.airs.first]: '',
                [show.genre]: '',
                [show.language]: '',
                [show.network]: '',
                [show.overview]: '',
                [show.runtime]: 60,
                [show.status]: '',
                [show.lastupdate]: 0
            });
        const job = {
            id: 1,
            data: {
                ids: {tvdbId}
            }
        };

        // Act
        const affectedRows = await updateShow(job);

        // Assert
        const findShow = await db(show.$table)
            .first()
            .where(show.tvdbId, tvdbId);

        assert.strictEqual(affectedRows, 1);
        assert.strictEqual(findShow.imdb_id, 'tt0844441');
        assert.strictEqual(findShow.genre, '|Drama|Fantasy|Horror|Mystery|');
    });

    it('Should not update anything if show not already exist', async () => {
        // Arrange
        const job = {
            id: 1,
            data: {
                ids: {tvdbId}
            }
        };

        // Act
        const ids = await updateShow(job);

        // Assert
        assert(ids === undefined);
    });

});
