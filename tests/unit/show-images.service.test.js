'use strict';

import '../set-env-var';
import {assert} from 'chai';
import {spy} from 'simple-spy';
import ShowImageService from '../../dist/show-images.service';
import {logger} from '../../dist/lib/logger';

logger.info = () => {};

describe('Show Image Service', () => {

    const imageDownloaderMock = {
        imageDownloader: spy(() => Promise.resolve('image-name-to-save-in-database.jpg')),
        resize: spy(() => Promise.resolve('image-name-to-save-in-database-resize.jpg'))
    };

    beforeEach(() => {
        imageDownloaderMock.imageDownloader.reset();
        imageDownloaderMock.resize.reset();
    });

    describe('Fanart', () => {

        it(`Should return undefined if show doesn't exist`, async () => {
            // Arrange
            const databaseMock = {
                getShowFanartByTvdbId: spy(() => Promise.resolve(undefined))
            };
            const job = {
                ids: {
                    tvdbId: 1
                }
            };
            const service = new ShowImageService(databaseMock, imageDownloaderMock);

            // Act
            const result = await service.setOrUpdateShowFanart(job);

            // Assert
            assert.strictEqual(result, undefined, 'Should return undefined');
            assert.strictEqual(imageDownloaderMock.imageDownloader.callCount, 0, 'Should not have called image downloader');
            assert.strictEqual(imageDownloaderMock.resize.callCount, 0, 'Should not have called image resize');
        });

        it(`Should return undefined if fanart alrady exist for show`, async () => {
            // Arrange
            const databaseMock = {
                getShowFanartByTvdbId: spy(() => Promise.resolve({fanart: 'fanart.jpg'}))
            };
            const job = {
                ids: {
                    tvdbId: 1
                }
            };
            const service = new ShowImageService(databaseMock, imageDownloaderMock);

            // Act
            const result = await service.setOrUpdateShowFanart(job);

            // Assert
            assert.strictEqual(result, undefined, 'Should return undefined');
            assert.strictEqual(imageDownloaderMock.imageDownloader.callCount, 0, 'Should not have called image downloader');
            assert.strictEqual(imageDownloaderMock.resize.callCount, 0, 'Should not have called image resize');
        });

        it(`Should download fanart if it doesn't alrady exist`, async () => {
            // Arrange
            const databaseMock = {
                getShowFanartByTvdbId: spy(() => Promise.resolve({
                    id: 42,
                    fanart: ''
                })),
                updateShowFanart: () => {}
            };
            const job = {
                ids: {
                    tvdbId: 1,
                    filename: 'image.jpg'
                }
            };
            const service = new ShowImageService(databaseMock, imageDownloaderMock);

            // Act
            await service.setOrUpdateShowFanart(job);

            // Assert
            assert.strictEqual(imageDownloaderMock.imageDownloader.callCount, 1, 'Should have called image downloader');
            assert.strictEqual(imageDownloaderMock.imageDownloader.args[0].length, 2);
            assert.strictEqual(imageDownloaderMock.imageDownloader.args[0][0], `http://thetvdb.com/banners/${job.fileName}`);
            assert.strictEqual(imageDownloaderMock.imageDownloader.args[0][1], process.env.EH_SHOW_FANART);
            assert.strictEqual(imageDownloaderMock.resize.callCount, 0, 'Should not have called image resize');
        });

        it(`Should update database after download`, async () => {
            // Arrange
            const databaseMock = {
                getShowFanartByTvdbId: spy(() => Promise.resolve({
                    id: 42,
                    fanart: ''
                })),
                updateShowFanart: spy(() => {})
            };
            const job = {
                ids: {
                    tvdbId: 1,
                    filename: 'image.jpg'
                }
            };
            const service = new ShowImageService(databaseMock, imageDownloaderMock);

            // Act
            await service.setOrUpdateShowFanart(job);

            // Assert
            assert.strictEqual(databaseMock.updateShowFanart.callCount, 1);
            assert.strictEqual(databaseMock.updateShowFanart.args[0][0], 42);
            assert.strictEqual(databaseMock.updateShowFanart.args[0][1], 'image-name-to-save-in-database.jpg');
        });
    });

    describe('Poster', () => {

        it(`Should return undefined if show doesn't exist`, async () => {
            // Arrange
            const databaseMock = {
                getShowPosterByTvdbId: spy(() => Promise.resolve(undefined))
            };
            const job = {
                ids: {
                    tvdbId: 1
                }
            };
            const service = new ShowImageService(databaseMock, imageDownloaderMock);

            // Act
            const result = await service.setOrUpdateShowPoster(job);

            // Assert
            assert.strictEqual(result, undefined, 'Should return undefined');
            assert.strictEqual(imageDownloaderMock.imageDownloader.callCount, 0, 'Should not have called image downloader');
            assert.strictEqual(imageDownloaderMock.resize.callCount, 0, 'Should not have called image resize');
        });

        it(`Should return undefined if poster alrady exist for show`, async () => {
            // Arrange
            const databaseMock = {
                getShowPosterByTvdbId: spy(() => Promise.resolve({poster: 'poster.jpg'}))
            };
            const job = {
                ids: {
                    tvdbId: 1
                }
            };
            const service = new ShowImageService(databaseMock, imageDownloaderMock);

            // Act
            const result = await service.setOrUpdateShowPoster(job);

            // Assert
            assert.strictEqual(result, undefined, 'Should return undefined');
            assert.strictEqual(imageDownloaderMock.imageDownloader.callCount, 0, 'Should not have called image downloader');
            assert.strictEqual(imageDownloaderMock.resize.callCount, 0, 'Should not have called image resize');
        });

        it(`Should download poster if it doesn't alrady exist`, async () => {
            // Arrange
            const databaseMock = {
                getShowPosterByTvdbId: spy(() => Promise.resolve({
                    id: 42,
                    poster: ''
                })),
                updateShowPoster: () => {}
            };
            const job = {
                ids: {
                    tvdbId: 1,
                    filename: 'poster.jpg'
                }
            };
            const service = new ShowImageService(databaseMock, imageDownloaderMock);

            // Act
            await service.setOrUpdateShowPoster(job);

            // Assert
            assert.strictEqual(imageDownloaderMock.resize.callCount, 1, 'Should have called resize');
            assert.strictEqual(imageDownloaderMock.resize.args[0].length, 4);
            assert.strictEqual(imageDownloaderMock.resize.args[0][0], `http://thetvdb.com/banners/${job.fileName}`);
            assert.strictEqual(imageDownloaderMock.resize.args[0][1], process.env.EH_SHOW_POSTER);
            assert.strictEqual(imageDownloaderMock.resize.args[0][2], 185);
            assert.strictEqual(imageDownloaderMock.resize.args[0][3], 274);
            assert.strictEqual(imageDownloaderMock.imageDownloader.callCount, 0, 'Should not have called imageDownloader');
        });

        it(`Should update database after download`, async () => {
            // Arrange
            const databaseMock = {
                getShowPosterByTvdbId: spy(() => Promise.resolve({
                    id: 42,
                    poster: ''
                })),
                updateShowPoster: spy(() => {})
            };
            const job = {
                ids: {
                    tvdbId: 1,
                    filename: 'image.jpg'
                }
            };
            const service = new ShowImageService(databaseMock, imageDownloaderMock);

            // Act
            await service.setOrUpdateShowPoster(job);

            // Assert
            assert.strictEqual(databaseMock.updateShowPoster.callCount, 1);
            assert.strictEqual(databaseMock.updateShowPoster.args[0][0], 42);
            assert.strictEqual(databaseMock.updateShowPoster.args[0][1], 'image-name-to-save-in-database-resize.jpg');
        });
    });

});
