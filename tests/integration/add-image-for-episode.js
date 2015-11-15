'use strict';

import {assert} from 'chai';
import {episode} from '../../dist/episodehunter-messages/database/episode'
import database from '../../dist/lib/database';
import {addOrUpdateEpisodeImage} from '../../dist/start';
import {logger} from '../../dist/lib/logger';

logger.info = () => {};

describe('Episode image', () => {

    const db = database.connect();
    const episodeId = 790;

    before(async () => {
        await db
            .first(episode.id)
            .from(episode.$table)
            .where(episode.id, episodeId)
            .then(result => {
                if (!result) {
                    throw new Error('The first episode of Game of thrones do not exist in the database, add it!');
                }
            });
    });

    it('Should add a image for an episode', async () => {
        // Arrange
        await db(episode.$table)
            .update(episode.image, '')
            .where(episode.id, episodeId);
        const job = {
            id: 1,
            data: {
                ids: {
                    tvdbId: 3254641
                },
                fileName: 'episodes/121361/3254641.jpg'
            }
        };

        // Act
        await addOrUpdateEpisodeImage(job);

        // Assert
        const gameOfThrones = await db
            .first(episode.image)
            .from(episode.$table)
            .where(episode.id, episodeId);
        assert(gameOfThrones.image.length > 0, 'The database should now contain a image for got');
    });

    it('Should not add a image for Game Of Thrones if it already exist', async () => {
        // Arrange
        const episodeName = 'some-episode.jpg';
        await db(episode.$table)
            .update(episode.image, episodeName)
            .where(episode.id, episodeId);
        const job = {
            id: 1,
            data: {
                ids: {
                    tvdbId: 3254641
                },
                fileName: 'episodes/121361/3254641.jpg'
            }
        };

        // Act
        await addOrUpdateEpisodeImage(job);

        // Assert
        const gameOfThrones = await db
            .first(episode.image)
            .from(episode.$table)
            .where(episode.id, episodeId);
        assert(gameOfThrones.image === episodeName, 'The image name should not change');
    });

});
