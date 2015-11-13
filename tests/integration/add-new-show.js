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

    before(async () => {
        // Set db in known state
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
        await addShow(job);

        // Assert
        const show = await db(series.$table)
            .first(series.id)
            .where(series.tvdbId, tvdbId);
        const episodes = await db(episode.$table)
            .count(`${episode.id} as count`)
            .where(episode.seriesTvdbId, tvdbId);

        assert.isNumber(show.id);
        assert.strictEqual(episodes[0].count, 94);
    });

});
