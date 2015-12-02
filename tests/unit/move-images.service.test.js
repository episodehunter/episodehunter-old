'use strict';

import '../set-env-var';
import {assert} from 'chai';
import {spy} from 'simple-spy';
import MovieImageService from '../../dist/movie-images.service';
import {logger} from '../../dist/lib/logger';

logger.info = () => {};

describe('Movie Image Service', () => {

    const imageDownloaderMock = spy(() => Promise.resolve('image-name-to-save-in-database.jpg'));
    const theMovieDbMock = {
        getBaseImageUrl: () => 'https://themoviedb.com/some-path/'
    };

    beforeEach(() => {
        imageDownloaderMock.reset();
        imageDownloaderMock.reset();
    });

    describe('Fanart', () => {

        it(`Should return undefined if movie doesn't exist`, async () => {
            // Arrange
            const databaseMock = {
                getMovieFanartByTmdbId: spy(() => Promise.resolve(undefined))
            };
            const job = {
                ids: {
                    tmdbId: 1
                }
            };
            const service = new MovieImageService(databaseMock, imageDownloaderMock, theMovieDbMock);

            // Act
            const result = await service.setOrUpdateMovieFanart(job);

            // Assert
            assert.strictEqual(result, undefined, 'Should return undefined');
            assert.strictEqual(imageDownloaderMock.callCount, 0, 'Should not have called image downloader');
        });

        it(`Should return undefined if fanart alrady exist for movie`, async () => {
            // Arrange
            const databaseMock = {
                getMovieFanartByTmdbId: spy(() => Promise.resolve({fanart: 'fanart.jpg'}))
            };
            const job = {
                ids: {
                    tmdbId: 1
                }
            };
            const service = new MovieImageService(databaseMock, imageDownloaderMock, theMovieDbMock);

            // Act
            const result = await service.setOrUpdateMovieFanart(job);

            // Assert
            assert.strictEqual(result, undefined, 'Should return undefined');
            assert.strictEqual(imageDownloaderMock.callCount, 0, 'Should not have called image downloader');
        });

        it(`Should download fanart if it doesn't alrady exist`, async () => {
            // Arrange
            const databaseMock = {
                getMovieFanartByTmdbId: spy(() => Promise.resolve({
                    id: 42,
                    fanart: ''
                })),
                updateMovieFanart: () => {}
            };
            const job = {
                ids: {
                    tmdbId: 1
                },
                fileName: 'image.jpg'
            };
            const service = new MovieImageService(databaseMock, imageDownloaderMock, theMovieDbMock);

            // Act
            await service.setOrUpdateMovieFanart(job);

            // Assert
            assert.strictEqual(imageDownloaderMock.callCount, 1, 'Should have called image downloader');
            assert.strictEqual(imageDownloaderMock.args[0].length, 2);
            assert.strictEqual(imageDownloaderMock.args[0][0], `https://themoviedb.com/some-path/original/${job.fileName}`);
            assert.strictEqual(imageDownloaderMock.args[0][1], process.env.EH_MOVIE_FANART);
        });

        it(`Should update database after download`, async () => {
            // Arrange
            const databaseMock = {
                getMovieFanartByTmdbId: spy(() => Promise.resolve({
                    id: 42,
                    fanart: ''
                })),
                updateMovieFanart: spy(() => {})
            };
            const job = {
                ids: {
                    tmdbId: 1
                },
                filename: 'image.jpg'
            };
            const service = new MovieImageService(databaseMock, imageDownloaderMock, theMovieDbMock);

            // Act
            await service.setOrUpdateMovieFanart(job);

            // Assert
            assert.strictEqual(databaseMock.updateMovieFanart.callCount, 1);
            assert.strictEqual(databaseMock.updateMovieFanart.args[0][0], 42);
            assert.strictEqual(databaseMock.updateMovieFanart.args[0][1], 'image-name-to-save-in-database.jpg');
        });
    });

    describe('Poster', () => {

        it(`Should return undefined if movie doesn't exist`, async () => {
            // Arrange
            const databaseMock = {
                getMoviePosterByTmdbId: spy(() => Promise.resolve(undefined))
            };
            const job = {
                ids: {
                    tmdbId: 1
                }
            };
            const service = new MovieImageService(databaseMock, imageDownloaderMock, undefined);

            // Act
            const result = await service.setOrUpdateMoviePoster(job);

            // Assert
            assert.strictEqual(result, undefined, 'Should return undefined');
            assert.strictEqual(imageDownloaderMock.callCount, 0, 'Should not have called image downloader');
        });

        it(`Should return undefined if poster alrady exist for movie`, async () => {
            // Arrange
            const databaseMock = {
                getMoviePosterByTmdbId: spy(() => Promise.resolve({poster: 'poster.jpg'}))
            };
            const job = {
                ids: {
                    tmdbId: 1
                }
            };
            const service = new MovieImageService(databaseMock, imageDownloaderMock);

            // Act
            const result = await service.setOrUpdateMoviePoster(job);

            // Assert
            assert.strictEqual(result, undefined, 'Should return undefined');
            assert.strictEqual(imageDownloaderMock.callCount, 0, 'Should not have called image downloader');
        });

        it(`Should download poster if it doesn't alrady exist`, async () => {
            // Arrange
            const databaseMock = {
                getMoviePosterByTmdbId: spy(() => Promise.resolve({
                    id: 42,
                    poster: ''
                })),
                updateMoviePoster: () => {}
            };
            const job = {
                ids: {
                    tmdbId: 1
                },
                fileName: 'poster.jpg'
            };
            const service = new MovieImageService(databaseMock, imageDownloaderMock, theMovieDbMock);

            // Act
            await service.setOrUpdateMoviePoster(job);

            // Assert
            assert.strictEqual(imageDownloaderMock.callCount, 1, 'Should have called resize');
            assert.strictEqual(imageDownloaderMock.args[0].length, 2);
            assert.strictEqual(imageDownloaderMock.args[0][0], `https://themoviedb.com/some-path/w185/${job.fileName}`);
            assert.strictEqual(imageDownloaderMock.args[0][1], process.env.EH_MOVIE_POSTER);
        });

        it(`Should update database after download`, async () => {
            // Arrange
            const databaseMock = {
                getMoviePosterByTmdbId: spy(() => Promise.resolve({
                    id: 42,
                    poster: ''
                })),
                updateMoviePoster: spy(() => {})
            };
            const job = {
                ids: {
                    tmdbId: 1
                },
                fileName: 'image.jpg'
            };
            const service = new MovieImageService(databaseMock, imageDownloaderMock, theMovieDbMock);

            // Act
            await service.setOrUpdateMoviePoster(job);

            // Assert
            assert.strictEqual(databaseMock.updateMoviePoster.callCount, 1);
            assert.strictEqual(databaseMock.updateMoviePoster.args[0][0], 42);
            assert.strictEqual(databaseMock.updateMoviePoster.args[0][1], 'image-name-to-save-in-database.jpg');
        });
    });

});
