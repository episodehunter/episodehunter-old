'use strict';

import '../set-env-var';
import {assert} from 'chai';
import {movie} from '../../dist/episodehunter-messages/database/movie';
import database from '../../dist/lib/database';
import {addOrUpdateMovieFanart} from '../../dist/start';
import {logger} from '../../dist/lib/logger';

logger.info = () => {};

describe('Movie fanart', () => {

    const db = database.connect();
    const theHungerGamesId = 1;

    before(async () => {
        await db
            .first(movie.id)
            .from(movie.$table)
            .where(movie.id, theHungerGamesId)
            .then(result => {
                if (!result) {
                    throw new Error('The Hunger Games do not exist in the database, add it!');
                }
            });
    });

    it('Should add a fanart for The Hunger Games', async () => {
        // Arrange
        await db(movie.$table)
            .update(movie.fanart, '')
            .where(movie.id, theHungerGamesId);
        const job = {
            id: 1,
            data: {
                ids: {
                    tmdbId: 70160
                },
                fileName: '/sVv4VXJ7Vd9qDPncs0zu2XepWQr.jpg'
            }
        };

        // Act
        await addOrUpdateMovieFanart(job);

        // Assert
        const theHungerGames = await db
            .first(movie.fanart)
            .from(movie.$table)
            .where(movie.id, theHungerGamesId);
        assert(theHungerGames.fanart.length > 0, 'The database should now contain a fanart for The Hunger Games');
    });

    it('Should not add a fanart for The Hunger Games if it already exist', async () => {
        // Arrange
        const fanartName = 'some-fanart.jpg';
        await db(movie.$table)
            .update(movie.fanart, fanartName)
            .where(movie.id, theHungerGamesId);
        const job = {
            id: 1,
            data: {
                ids: {
                    tmdbId: 70160
                },
                fileName: '/sVv4VXJ7Vd9qDPncs0zu2XepWQr.jpg'
            }
        };

        // Act
        await addOrUpdateMovieFanart(job);

        // Assert
        const theHungerGames = await db
            .first(movie.fanart)
            .from(movie.$table)
            .where(movie.id, theHungerGamesId);
        assert(theHungerGames.fanart === fanartName, 'The fanart name should not change');
    });

});
