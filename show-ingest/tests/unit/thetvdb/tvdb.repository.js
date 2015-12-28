import {assert} from 'chai';
import {spy} from 'simple-spy';
import config from '../../../dist/config';
import {trueblood} from '../../testdata/trueblood';
import TvDbRepository from '../../../dist/thetvdb/tvdb-repository';
import {TvdbShow} from '../../../dist/thetvdb/tvdb.model';

describe('The TV DB Repository', () => {

    const gotMock = spy(() => Promise.resolve({body: trueblood}));
    let repo;

    beforeEach(() => {
        gotMock.reset();
        repo = new TvDbRepository(gotMock);
    });

    it('Should make a http call', () => {
        // Arrange
        const tvdbid = 123;

        // Act
        repo.getShowAndEpisode(tvdbid);

        // Assert
        assert.equal(gotMock.callCount, 1);
        assert.lengthOf(gotMock.args[0], 1);
        assert.equal(gotMock.args[0][0], `http://thetvdb.com/api/${config.tvdbAPIkey}/series/${tvdbid}/all/en.xml`);
    });

    it('Should create a tvDbModel from http response', () => {
        // Arrange
        const tvdbid = 123;

        // Act and assert
        return repo.getShowAndEpisode(tvdbid)
            .then(model => {
                assert.instanceOf(model, TvdbShow);
            });
    });

    it('Should set all model props correctly in the tvDbModel', () => {
        // Arrange
        const tvdbid = 123;

        // Act and assert
        return repo.getShowAndEpisode(tvdbid)
            .then(model => {
                assert.strictEqual(model.id, 82283, 'id');
                assert.strictEqual(model.imdb, 'tt0844441', 'imdb');
                assert.strictEqual(model.name, 'True Blood', 'name');
                assert.strictEqual(model.airs.dayOfWeek, 'Sunday', 'airs.dayOfWeek');
                assert.strictEqual(model.airs.time, '9:00 PM', 'airs.time');
                assert.strictEqual(model.airs.first, '2008-09-07', 'airs.first');
                assert.strictEqual(model.genre, '|Drama|Fantasy|Horror|Mystery|', 'genre');
                assert.strictEqual(model.language, 'en', 'language');
                assert.strictEqual(model.network, 'HBO', 'network');
                assert.strictEqual(model.overview.substr(0, 20), 'True Blood is based ', 'overview');
                assert.strictEqual(model.runtime, 60, 'runtime');
                assert.strictEqual(model.status, 'Ended', 'status');
                assert.strictEqual(model.fanart, 'fanart/original/82283-8.jpg', 'fanart');
                assert.strictEqual(model.poster, 'posters/82283-36.jpg', 'poster');
            });
    });

    it('Should set all model props correctly for episodes the tvDbModel', () => {
        // Arrange
        const tvdbid = 123;

        // Act and assert
        return repo.getShowAndEpisode(tvdbid)
            .then(model => {
                const episode = model.episodes[0];
                assert.lengthOf(model.episodes, 94);

                assert.strictEqual(episode.id, 385957, 'id');
                assert.strictEqual(episode.name, 'Unaired Pilot', 'name');
                assert.strictEqual(episode.seasonNumber, 0, 'season');
                assert.strictEqual(episode.episodeNumber, 1, 'episode');
                assert.strictEqual(episode.firstAired, '2008-06-16', 'firstAired');
                assert.strictEqual(episode.overview.substr(0, 20), 'Very similar to the ', 'overview');
                assert.strictEqual(episode.thumbnail, 'episodes/82283/385957.jpg', 'thumbnail');
            });
    });

});
