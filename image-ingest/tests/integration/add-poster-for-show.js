'use strict';

import '../set-env-var';
import {assert} from 'chai';
import {show} from '../../dist/episodehunter-messages/database/show';
import database from '../../dist/lib/database';
import {addOrUpdateShowPoster} from '../../dist/start';
import {logger} from '../../dist/lib/logger';

logger.info = () => {};

describe('Show poster', () => {

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

    it('Should add a poster for Game Of Thrones', async () => {
        // Arrange
        await db(show.$table)
            .update(show.poster, '')
            .where(show.id, gotId);
        const job = {
            id: 1,
            data: {
                ids: {
                    tvdbId: 121361
                },
                fileName: 'posters/121361-34.jpg'
            }
        };

        // Act
        await addOrUpdateShowPoster(job);

        // Assert
        const gameOfThrones = await db
            .first(show.poster)
            .from(show.$table)
            .where(show.id, gotId);
        assert(gameOfThrones.poster.length > 0, 'The database should now contain a poster for got');
    });

    it('Should not add a poster for Game Of Thrones if it already exist', async () => {
        // Arrange
        const posterName = 'some-poster.jpg';
        await db(show.$table)
            .update(show.poster, posterName)
            .where(show.id, gotId);
        const job = {
            id: 1,
            data: {
                ids: {
                    tvdbId: 121361
                },
                fileName: 'posters/121361-34.jpg'
            }
        };

        // Act
        await addOrUpdateShowPoster(job);

        // Assert
        const gameOfThrones = await db
            .first(show.poster)
            .from(show.$table)
            .where(show.id, gotId);
        assert(gameOfThrones.poster === posterName, 'The poster name should not change');
    });

});
