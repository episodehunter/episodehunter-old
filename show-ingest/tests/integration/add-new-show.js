import '../set-env-var';
import {assert} from 'chai';
import {connect as createQueue} from 'episodehunter-queue';
import {show} from 'messages/database/show';
import {episode} from 'messages/database/episode';
import {addShow} from '../../dist/start';
import database from '../../dist/lib/database';
import TvDbRepository from '../../dist/thetvdb/tvdb-repository';
import {trueblood} from '../testdata/trueblood';

const queue = createQueue();

let httpGetMock = () => {
    return Promise.resolve({body: trueblood});
};
TvDbRepository.inject = [httpGetMock];

describe('Add true blood', () => {

    const tvdbId = 82283;
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
        await db(show.$table)
            .where(show.tvdbId, tvdbId)
            .del();

        await db(episode.$table)
            .where(episode.showTvdbId, tvdbId)
            .del();
    });

    it('Should add true blood from mock data', async () => {
        // Arrange
        const job = {
            id: 1,
            data: {
                ids: {tvdbId}
            }
        };

        // Act
        const success = await addShow(job);

        // Assert
        const findShow = await db(show.$table)
            .first(show.id)
            .where(show.tvdbId, tvdbId);
        const episodes = await db(episode.$table)
            .count(`${episode.id} as count`)
            .where(episode.showTvdbId, tvdbId);

        assert.isTrue(success);
        assert.isNumber(findShow.id);
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

        // Act
        const success = await addShow(job);

        // Assert
        assert(success === undefined);
    });

    it('Should request to download images when adding true blood from mock data', async () => {
        // Arrange
        const job = {
            id: 1,
            data: {
                ids: {tvdbId}
            }
        };

        // Act
        const success = await addShow(job);

        // Assert
        assert.isTrue(success);
        assert.strictEqual(queue.testMode.jobs.length, 96);
    });

});
