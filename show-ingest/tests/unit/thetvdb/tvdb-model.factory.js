import {assert} from 'chai';
import tvDbFactory from '../../../dist/thetvdb/tvdb-model.factory';
import TvdbShow from '../../../dist/thetvdb/tvdb.model';

describe('The TV DB model factory', () => {

    it('Should create a model from TvDbResponse', () => {
        // Arrange
        const data = {
            Series: {
                id: 1
            }
        };

        // Act
        const result = tvDbFactory.tvdbShowFactory(data);

        // Assert
        assert.instanceOf(result, TvdbShow);
    });

    it('Should save all episodes if array', () => {
        // Arrange
        const data = {
            Series: {
                id: 1
            },
            Episode: [{
                id: 1,
                name: 'Something',
                seasonNumber: 1,
                episodeNumber: 1,
                firstAired: '2015-02-14',
                overview: 'Some information',
                thumbnail: 'somepic.jpg'
            }, {
                id: 2,
                name: 'Something else',
                seasonNumber: 1,
                episodeNumber: 2,
                firstAired: '2015-02-21',
                overview: 'Some information',
                thumbnail: 'somepic.jpg'
            }]
        };

        // Act
        const result = tvDbFactory.tvdbShowFactory(data);

        // Assert
        assert.lengthOf(result.episodes, 2);
        assert.equal(result.episodes[0].id, data.Episode[0].id);
        assert.equal(result.episodes[1].id, data.Episode[1].id);
    });

    it('Should save one episode if none array', () => {
        // Arrange
        const data = {
            Series: {
                id: 1
            },
            Episode: {
                id: 1,
                name: 'Something',
                seasonNumber: 1,
                episodeNumber: 1,
                firstAired: '2015-02-14',
                overview: 'Some information',
                thumbnail: 'somepic.jpg'
            }
        };

        // Act
        const result = tvDbFactory.tvdbShowFactory(data);

        // Assert
        assert.lengthOf(result.episodes, 1);
        assert.equal(data.Episode.id, result.episodes[0].id);
    });

    it('Should save an empty array if non episode was given', () => {
        // Arrange
        const data = {
            Series: {
                id: 1
            }
        };

        // Act
        const result = tvDbFactory.tvdbShowFactory(data);

        // Assert
        assert.lengthOf(result.episodes, 0);
    });

});
