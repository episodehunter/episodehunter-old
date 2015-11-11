'use strict';

import {assert} from 'chai';
import {ShowIds} from 'eh-domain/model/handler/new';
import {series as showTable} from '../../episodehunter-messages/database/series';
import {episode as episodeTable} from '../../episodehunter-messages/database/episode';
import transformer from '../../add-new-show/thetvdb.transformer';
import {TvdbShow, TvdbEpisode} from '../../thetvdb/tvdb.model';

describe('Show transformer', () => {
    const orgGetTime = Date.prototype.getTime;

    before(() => {
        Date.prototype.getTime = () => 1447274890000;
    });

    after(() => {
        Date.prototype.getTime = orgGetTime;
    });

    describe('Transforming model to db insert', () => {

        it('Should transform a show model to a db model', () => {
            // Arrange
            const show: TvdbShow = {
                id: 1,
                imdb: 'tt12345',
                name: 'True Blood',
                airs: {
                    dayOfWeek: 'Sunday',
                    time: '9:00 PM',
                    first: '2012-09-12'
                },
                genre: '|Drama|Comedy',
                language: 'en',
                network: 'HBO',
                overview: 'Vampires',
                runtime: 60,
                status: 'Ended',
                fanart: 'fanart.jpg',
                poster: 'poster.jpg',
                episodes: []
            };

            // Act
            const result = transformer.transformShowForDbInsert(show);

            // Assert
            assert.deepEqual(result, {
                [showTable.tvdbId]: show.id,
                [showTable.imdbId]: show.imdb,
                [showTable.title]: show.name,
                [showTable.airs.dayOfWeek]: show.airs.dayOfWeek,
                [showTable.airs.time]: show.airs.time,
                [showTable.airs.first]: show.airs.first,
                [showTable.genre]: show.genre,
                [showTable.language]: show.language,
                [showTable.network]: show.network,
                [showTable.overview]: show.overview,
                [showTable.runtime]: show.runtime,
                [showTable.status]: show.status,
                [showTable.lastupdate]: 1447274890
            });

        });

        it('Should transform episodes model to a db model', () => {
            // Arrange
            const episodes: TvdbEpisode[] = [{
                id: 1,
                name: 'Hello',
                seasonNumber: 1,
                episodeNumber: 2,
                firstAired: '2012-09-01',
                overview: 'Hello, is it me you looking for?',
                thumbnail: 'thumbnail.jpg'
            }];

            const ids: ShowIds = {
                id: 2,
                tvdbId: 12345,
                imdbId: 'tt12345'
            };

            // Act
            const result = transformer.transformEpisodesForDBinsert(ids, episodes);

            // Assert
            assert.deepEqual(result[0], {
                [episodeTable.tvdbId]: episodes[0].id,
                [episodeTable.seriesTvdbId]: ids.tvdbId,
                [episodeTable.seriesId]: ids.id,
                [episodeTable.name]: episodes[0].name,
                [episodeTable.season]: episodes[0].seasonNumber,
                [episodeTable.episode]: episodes[0].episodeNumber,
                [episodeTable.firstAired]: episodes[0].firstAired,
                [episodeTable.overview]: episodes[0].overview,
                [episodeTable.lastupdate]: 1447274890
            });
        });
    });

});
