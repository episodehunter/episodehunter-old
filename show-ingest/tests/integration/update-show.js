'use strict';

import '../set-env-var';
import {assert} from 'chai';
import {updateShow} from '../../dist/start';
import {series} from '../../dist/episodehunter-messages/database/series';
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
        await db(series.$table)
            .where(series.tvdbId, tvdbId)
            .del();
    });

    it('Should update trueblood from mock data', async () => {
        // Arrange
        await db(series.$table)
            .insert({
                [series.tvdbId]: tvdbId,
                [series.imdbId]: '',
                [series.title]: 'True Blood',
                [series.airs.dayOfWeek]: '',
                [series.airs.time]: '',
                [series.airs.first]: '',
                [series.genre]: '',
                [series.language]: '',
                [series.network]: '',
                [series.overview]: '',
                [series.runtime]: 60,
                [series.status]: '',
                [series.lastupdate]: 0
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
        const show = await db(series.$table)
            .first()
            .where(series.tvdbId, tvdbId);

        assert.strictEqual(affectedRows, 1);
        assert.strictEqual(show.imdb_id, 'tt0844441');
        assert.strictEqual(show.genre, '|Drama|Fantasy|Horror|Mystery|');
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
