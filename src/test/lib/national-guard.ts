import {assert} from 'chai';
import {parseInteger, isNumric, isDefined} from '../../lib/national-guard';

describe('lib National Guard', () => {

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

    describe('isDefined', () => {

        it(`Should return false undefined`, () => {
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
