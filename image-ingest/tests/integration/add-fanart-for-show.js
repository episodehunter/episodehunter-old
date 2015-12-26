'use strict';

import '../set-env-var';
import {assert} from 'chai';
import {show} from '../../dist/episodehunter-messages/database/show';
import database from '../../dist/lib/database';
import {addOrUpdateShowFanart} from '../../dist/start';
import {logger} from '../../dist/lib/logger';

logger.info = () => {};

describe('Show fanart', () => {

    const db = database.connect();
    const gotId = 10;

    before(async () => {
        await db
            .first(show.id)
            .from(show.$table)
            .where(show.id, gotId)
            .then(result => {
                if (!result) {
                    throw new Error('Game of thrones to not exist in the database add it');
                }
            });
    });

    it('Should add a fanart for Game Of Thrones', async () => {
        // Arrange
        await db(show.$table)
            .update(show.fanart, '')
            .where(show.id, gotId);
        const job = {
            id: 1,
            data: {
                ids: {
                    tvdbId: 121361
                },
                fileName: 'fanart/original/121361-83.jpg'
            }
        };

        // Act
        await addOrUpdateShowFanart(job);

        // Assert
        const gameOfThrones = await db
            .first(show.fanart)
            .from(show.$table)
            .where(show.id, gotId);
        assert(gameOfThrones.fanart.length > 0, 'The database should now contain a fanart for got');
    });

    it('Should not add a fanart for Game Of Thrones if it already exist', async () => {
        // Arrange
        const fanartName = 'some-fanart.jpg';
        await db(show.$table)
            .update(show.fanart, fanartName)
            .where(show.id, gotId);
        const job = {
            id: 1,
            data: {
                ids: {
                    tvdbId: 121361
                },
                fileName: 'fanart/original/121361-83.jpg'
            }
        };

        // Act
        await addOrUpdateShowFanart(job);

        // Assert
        const gameOfThrones = await db
            .first(show.fanart)
            .from(show.$table)
            .where(show.id, gotId);
        assert(gameOfThrones.fanart === fanartName, 'The fanart name should not change');
    });

});
