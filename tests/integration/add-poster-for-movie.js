'use strict';

import {assert} from 'chai';
import {movie} from '../../dist/episodehunter-messages/database/movie';
import database from '../../dist/lib/database';
import {addOrUpdateMoviePoster} from '../../dist/start';
import {logger} from '../../dist/lib/logger';

logger.info = () => {};

describe('Movie poster', () => {

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

    it('Should add a poster for The Hunger Games', async () => {
        // Arrange
        await db(movie.$table)
            .update(movie.poster, '')
            .where(movie.id, theHungerGamesId);
        const job = {
            id: 1,
            data: {
                ids: {
                    tmdbId: 70160
                },
                fileName: '/iLJdwmzrHFjFwI5lvYAT1gcpRuA.jpg'
            }
        };

        // Act
        await addOrUpdateMoviePoster(job);

        // Assert
        const theHungerGames = await db
            .first(movie.poster)
            .from(movie.$table)
            .where(movie.id, theHungerGamesId);
        assert(theHungerGames.poster.length > 0, 'The database should now contain a poster for The Hunger Games');
    });

    it('Should not add a poster for The Hunger Games if it already exist', async () => {
        // Arrange
        const posterName = 'some-fanart.jpg';
        await db(movie.$table)
            .update(movie.poster, posterName)
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
        await addOrUpdateMoviePoster(job);

        // Assert
        const theHungerGames = await db
            .first(movie.poster)
            .from(movie.$table)
            .where(movie.id, theHungerGamesId);
        assert(theHungerGames.poster === posterName, 'The poster name should not change');
    });

});
