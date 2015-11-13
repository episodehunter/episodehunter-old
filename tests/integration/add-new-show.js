'use strict';

import {assert} from 'chai';
import {addShow} from '../../dist/start';
import {series} from '../../dist/episodehunter-messages/database/series';
import {episode} from '../../dist/episodehunter-messages/database/episode';
import database from '../../dist/lib/database';
import TvDbRepository from '../../dist/thetvdb/tvdb-repository';
import {trueblood} from '../testdata/trueblood';

let httpGetMock = () => {
    return Promise.resolve({body: trueblood});
};
TvDbRepository.inject = [httpGetMock];

describe('Add trueblood', () => {

    const tvdbId = 82283;
    const db = database.connect();

    beforeEach(async () => {
        // Set db in a known state
        await db(series.$table)
            .where(series.tvdbId, tvdbId)
            .del();

        await db(episode.$table)
            .where(episode.seriesTvdbId, tvdbId)
            .del();
    });

    after(() => {
        db.destroy();
    });

    it('Should add trueblood from mock data', async () => {
        // Arrange
        const job = {
            id: 1,
            data: {
                ids: {tvdbId}
            }
        };

        // Act
        const ids = await addShow(job);

        // Assert
        const show = await db(series.$table)
            .first(series.id)
            .where(series.tvdbId, tvdbId);
        const episodes = await db(episode.$table)
            .count(`${episode.id} as count`)
            .where(episode.seriesTvdbId, tvdbId);

        assert.isArray(ids);
        assert.isNumber(show.id);
        assert.strictEqual(episodes[0].count, 94);
    });

    it('Should not add anything if show already exist', async () => {
        // Arrange
        const job = {
            id: 1,
            data: {
                ids: {tvdbId}
            }
        };
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

        // Act
        const ids = await addShow(job);

        // Assert
        assert(ids === undefined);
    });

});
