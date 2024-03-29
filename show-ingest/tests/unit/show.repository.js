'use strict';

import {assert} from 'chai';
const Knex = require('knex');
const mockKnex = require('mock-knex');
import ShowDbReposetory from '../../dist/database.repository';


describe('Show DB repository', () => {
    let tracker;
    let repo;

    before(() => {
        tracker = mockKnex.getTracker();
        let db = Knex({});
        mockKnex.mock(db, 'knex@0.8');

        repo = new ShowDbReposetory({connect: () => db});
    });

    beforeEach(() => {
        tracker.install();
    });

    afterEach(() => {
        tracker.uninstall();
    });

    describe('Searching for show', () => {

        it('Should make exact one db call', () => {
            // Arrange
            const id = 7;
            tracker.on('query', query => {
                query.response({id});
            });

            // Act
            return repo.serieExistWithTvdbId(id)
                .then(() => {
                    assert.strictEqual(tracker.queries.count(), 1);
                });
        });

        it('Should return true if match was found', () => {
            // Arrange
            const id = 7;
            tracker.on('query', query => query.response({id}));

            // Act and assert
            return repo.serieExistWithTvdbId(id)
                .then(result => {
                    assert.strictEqual(result, true);
                });
        });

        it('Should return false if not match was found', () => {
            // Arrange
            const id = 7;
            tracker.on('query', query => query.response(undefined));

            // Act and assert
            return repo.serieExistWithTvdbId(id)
                .then(result => {
                    assert.strictEqual(result, false);
                });
        });

        it('Should not reject even if no match', () => {
            // Arrange
            const id = 7;
            tracker.on('query', query => query.response(undefined));

            // Act and assert
            return repo.serieExistWithTvdbId(id);
        });
    });

    describe('Insert show', () => {

        it('Should make three inserts', () => {
            // Arrange
            const episodes = Array(120).fill({
                'serie_name': 'Lost'
            });
            tracker.on('query', query => query.response(undefined));

            // Act
            return repo.insertEpisodes(episodes)
                .then(() => {
                    assert.strictEqual(tracker.queries.count(), 3);
                });
        });

        it('Should reject if passing non-array', done => {
            // Arrange
            const episodes = undefined;

            // Act
            repo.insertEpisodes(episodes)
                .catch(() => {
                    done();
                });
        });

    });

});
