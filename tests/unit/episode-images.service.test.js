'use strict';

import '../set-env-var';
import {assert} from 'chai';
import {spy} from 'simple-spy';
import EpisodeImageService from '../../dist/episode-images.service';
import {logger} from '../../dist/lib/logger';

logger.info = () => {};

describe('Episode Image Service', () => {

    const imageDownloaderMock = spy(() => Promise.resolve('image-name-to-save-in-database.jpg'));

    before(() => {
        imageDownloaderMock.reset();
    });

    it(`Should return undefined if episode don't exist`, async () => {
        // Arrange
        const databaseMock = {
            getEpisodeImageByTvdbId() {
                return Promise.resolve(undefined);
            }
        };
        const job = {
            ids: {
                tvdbId: 1
            }
        };
        const service = new EpisodeImageService(databaseMock, imageDownloaderMock);

        // Act
        const result = await service.getOrUpdateEpisodeImage(job);

        // Assert
        assert.strictEqual(result, undefined, 'Should return undefined');
        assert.strictEqual(imageDownloaderMock.callCount, 0, 'Should not have called image downloader');
    });

    it(`Should return undefined if episode alrady have an image`, async () => {
        // Arrange
        const databaseMock = {
            getEpisodeImageByTvdbId() {
                return Promise.resolve({image: 'image.jpg'});
            }
        };
        const job = {
            ids: {
                tvdbId: 1
            }
        };
        const service = new EpisodeImageService(databaseMock, imageDownloaderMock);

        // Act
        const result = await service.getOrUpdateEpisodeImage(job);

        // Assert
        assert.strictEqual(result, undefined, 'Should return undefined');
        assert.strictEqual(imageDownloaderMock.callCount, 0, 'Should not have called image downloader');
    });

    it(`Should download image if it does not alrady exist`, async () => {
        // Arrange
        const databaseMock = {
            getEpisodeImageByTvdbId() {
                return Promise.resolve({
                    id: 42,
                    image: ''
                });
            },
            updateEpisodeImage: spy(() => {})
        };
        const job = {
            ids: {
                tvdbId: 1
            },
            fileName: 'image.jpg'
        };
        const service = new EpisodeImageService(databaseMock, imageDownloaderMock);

        // Act
        await service.getOrUpdateEpisodeImage(job);

        // Assert
        assert.strictEqual(imageDownloaderMock.callCount, 1, 'Should not have called image downloader');
        assert.strictEqual(imageDownloaderMock.args[0].length, 2);
        assert.strictEqual(imageDownloaderMock.args[0][0], `http://thetvdb.com/banners/${job.fileName}`);
        assert.strictEqual(imageDownloaderMock.args[0][1], process.env.EH_EPISODE_IMAGE);
    });

    it(`Should update database after image download`, async () => {
        // Arrange
        const databaseMock = {
            getEpisodeImageByTvdbId() {
                return Promise.resolve({
                    id: 42,
                    image: ''
                });
            },
            updateEpisodeImage: spy(() => {})
        };
        const job = {
            ids: {
                tvdbId: 1
            },
            fileName: 'image.jpg'
        };
        const service = new EpisodeImageService(databaseMock, imageDownloaderMock);

        // Act
        await service.getOrUpdateEpisodeImage(job);

        // Assert
        assert.strictEqual(databaseMock.updateEpisodeImage.callCount, 1);
        assert.strictEqual(databaseMock.updateEpisodeImage.args[0][0], 42);
        assert.strictEqual(databaseMock.updateEpisodeImage.args[0][1], 'image-name-to-save-in-database.jpg');
    });

});
