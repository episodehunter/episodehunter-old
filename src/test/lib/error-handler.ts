import {assert, expect} from 'chai';
import {spy} from 'simple-spy';
import {logger} from '../../lib/logger';
import {catchDbError, rejectIfNoResult} from '../../lib/error-handler';

describe('Error handler', () => {

    describe('catchDbError', () => {
        let fatalSpy;
        const originalLog = logger.fatal;

        before(() => {
            fatalSpy = spy(() => {});
            logger.fatal = fatalSpy;
        });

        beforeEach(() => {
            fatalSpy.reset();
        });

        after(() => {
            logger.fatal = originalLog;
        });

        it(`Should log when db-error`, () => {
            // Arrange
            const error = 'error';

            // Act and Assert
            const fun = () => catchDbError(error);

            expect(fun).to.throw(error);
            assert.strictEqual(fatalSpy.callCount, 1);
            assert.strictEqual(fatalSpy.args[0][0], error);
        });
    });

    describe('rejectIfNoResult', () => {

        it(`Should reject if no data was given`, done => {
            // Arrange
            const data = undefined;

            // Act
            const result = rejectIfNoResult(data);

            // Assert
            result.catch(() => {
                done();
            });
        });

        it(`Should return same data if data is defined`, () => {
            // Arrange
            const data = 5;

            // Act
            const result = rejectIfNoResult(data);

            // Assert
            assert.strictEqual(result, data);
        });

    });

});
