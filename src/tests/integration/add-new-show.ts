'use strict';

import {assert} from 'chai';
import {addShow} from '../../start';
import {series} from '../../episodehunter-messages/database/series';
import database from '../../lib/database';


describe('Add trueblood', () => {

    const tvdbId = 82283;
    const db = database.connect();

    before(done => {
        // Set db in known state
        db(series.$table)
            .where(series.tvdbId, tvdbId)
            .del()
            .then(() => done())
            .catch(err => done(err));
    });

    after(() => {
        db.destroy();
    });

    it('Should add trueblood from mock data', async (done) => {
        // Arrange
        const job = {
            id: 1,
            data: {
                ids: {tvdbId}
            }
        };

        // This is stupid, having a try block inside a test function
        try {
            // Act and assert
            await addShow(job, (err, result) => {
                assert.strictEqual(err, undefined);

                db(series.$table)
                    .first(series.id)
                    .where(series.tvdbId, tvdbId)
                    .then(result => {
                        if (result && result.id) {
                            done()
                        } else {
                            done(`Did not find the serie with tvdbId:${tvdbId}`);
                        }
                    })
                    .catch(err => done(err));
            });
        } catch(err) {
            done(err);
        }

    });

});
