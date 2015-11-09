import {assert} from 'chai';
const Knex = require('knex');
const mockKnex = require('mock-knex');
import ShowDbReposetory from '../../add-new-show/show-db.repository';


describe('Show DB repository', () => {
    let mock;
    let tracker;
    let repo: ShowDbReposetory;

    before(() => {
        tracker = mockKnex.getTracker();
        let db = Knex(<any>{});
        mockKnex.mock(db, 'knex@0.8');

        repo = new ShowDbReposetory({connect: () => db});
    });

    beforeEach(() => {
        tracker.install();
    });

    afterEach(() => {
        tracker.uninstall();
    });

    it('Should make a select when searching for the-tv-db id', () => {
        // Arrange
        const id = 7;
        tracker.on('query', query => query.response({id}));

        // Act and assert
        return repo.serieExistWithTvdbId(id)
            .then(result => {
                assert.strictEqual(tracker.queries.count(), 1);
            });
    });

    it('Should return true if match was found', done => {
        // Arrange
        const id = 7;
        tracker.on('query', query => query.response({id}));

        // Act and assert
        repo.serieExistWithTvdbId(id)
            .then(result => {
                assert.strictEqual(result, true);
                done();
            });
    });

    it('Should return false if not match was found', done => {
        // Arrange
        const id = 7;
        tracker.on('query', query => query.response(undefined));

        // Act and assert
        repo.serieExistWithTvdbId(id)
            .then(result => {
                assert.strictEqual(result, false);
                done();
            });
    });

    it('Should not reject even if no match', done => {
        // Arrange
        const id = 7;
        tracker.on('query', query => query.response(undefined));

        // Act and assert
        repo.serieExistWithTvdbId(id)
            .then(result => {
                assert.strictEqual(tracker.queries.count(), 1);
                done();
            });
    });

});
