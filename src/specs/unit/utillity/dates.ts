import {assert} from 'chai';
import {extractYear} from '../../../lib/utility/dates';

describe('Utillity', () => {

    describe('Dates', () => {

        it(`Should return the year for a date string`, () => {
            // Arrange
            let date = '2015-08-26';

            // Act
            let result = extractYear(date);

            assert.strictEqual(result, 2015);
        });

        it(`Should return zero if passing a falsy value`, () => {
            // Arrange
            let date = undefined;

            // Act
            let result = extractYear(date);

            assert.strictEqual(result, 0);
        });
    });
});
