import {assert} from 'chai';
import {extractYear} from '../../../lib/utility/dates';

describe('Utillity', () => {

    describe('Dates', () => {

        it(`Should return the year for a date string`, () => {
            // Arrange
            const date = '2015-08-26';

            // Act
            const result = extractYear(date);

            assert.strictEqual(result, 2015);
        });

        it(`Should return zero if passing a falsy value`, () => {
            // Arrange
            const date = undefined;

            // Act
            const result = extractYear(date);

            assert.strictEqual(result, 0);
        });
    });
});
