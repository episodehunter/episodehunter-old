import {assert} from 'chai';
import {as, extractYear, isDefined, isNumric, now, parseInteger} from '../../lib/utility';

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

        it(`Should return a unix timestamp`, () => {
            // Act
            const timestamp = now();

            // Assert
            assert.isNumber(timestamp);
            assert(timestamp > 1448128744, 'The timestamp should be larger then the timestamp when I wrote this test case');
            assert(timestamp < 2000000000, 'The timestamp should smaller then the year 2033');
        });
    });

    describe('parseInteger', () => {

        it(`Should return NaN for a non-numric string`, () => {
            // Arrange
            let val = '3d';

            // Act
            let result = parseInteger(val);

            // Assert
            assert.isTrue(isNaN(result));
        });

        it(`Should return 0 for a zero string`, () => {
            // Arrange
            let val = '0';

            // Act
            let result = parseInteger(val);

            // Assert
            assert.strictEqual(result, 0);
        });

        it(`Should return 0 for a zero number`, () => {
            // Arrange
            let val = 0;

            // Act
            let result = parseInteger(val);

            // Assert
            assert.strictEqual(result, 0);
        });
    });

    describe('isNumric', () => {

        it(`Should return false for a non-numric string`, () => {
            // Arrange
            let val = '3d';

            // Act
            let result = isNumric(val);

            // Assert
            assert.isFalse(result);
        });

        it(`Should return true for a zero string`, () => {
            // Arrange
            let val = '0';

            // Act
            let result = isNumric(val);

            // Assert
            assert.isTrue(result);
        });

        it(`Should return true for a zero number`, () => {
            // Arrange
            let val = 0;

            // Act
            let result = isNumric(val);

            // Assert
            assert.isTrue(result);
        });

        it(`Should return false if some value is a non-numric value`, () => {
            // Act
            let result = isNumric(0, '3d');

            // Assert
            assert.isFalse(result);
        });

        it(`Should return true if all values is numric values`, () => {
            // Act
            let result = isNumric(0, '3');

            // Assert
            assert.isTrue(result);
        });
    });

    describe('isNumric', () => {

        it(`Should return false for non-numric value`, () => {
            // Arrange
            const val = 'Hello';

            // Act
            const result = isNumric(val);

            assert.isFalse(result);
        });

        it(`Should return true for numric value`, () => {
            // Arrange
            const val = '5';

            // Act
            const result = isNumric(val);

            assert.isTrue(result);
        });

        it(`Should return true for int`, () => {
            // Arrange
            const val = 5;

            // Act
            const result = isNumric(val);

            assert.isTrue(result);
        });
    });

    describe('as', () => {

        it(`Should build an as string`, () => {
            // Arrange
            const column = 'column';
            const newName = 'newName';

            // Act
            const result = as(column, newName);

            // Act
            assert.strictEqual(result, 'column as newName');
        });
    });

    describe('isDefined', () => {

        it(`Should return false for undefined`, () => {
            // Arrange
            let val;

            // Act
            let result = isDefined(val);

            // Assert
            assert.isFalse(result);
        });

        it(`Should return false for null`, () => {
            // Arrange
            let val = null;

            // Act
            let result = isDefined(val);

            // Assert
            assert.isFalse(result);
        });

        it(`Should return true for zero`, () => {
            // Arrange
            let val = 0;

            // Act
            let result = isDefined(val);

            // Assert
            assert.isTrue(result);
        });

        it(`Should return false if some value is a non-numric value`, () => {
            // Act
            let result = isNumric(0, undefined);

            // Assert
            assert.isFalse(result);
        });

        it(`Should return true if all values is defined`, () => {
            // Act
            let result = isNumric(0, '3');

            // Assert
            assert.isTrue(result);
        });
    });

});
