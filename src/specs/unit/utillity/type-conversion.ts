import {assert} from 'chai';
import {int} from '../../../lib/utility/type-conversion';

describe('Utillity', () => {

    describe('Type Conversion', () => {

        describe('int', function() {

        it('should return the value of an string integer', () => {
            assert.strictEqual(int('1'), 1);
        });

        it('should truncate the value of an float and return an integer', () => {
            assert.strictEqual(int('1.9'), 1);
        });

        it('should handle negative strings value', () => {
            assert.strictEqual(int('-1'), -1);
        });

        it('should equal 0 on non-numeric-strings', () => {
            assert.strictEqual(int('Not a number'), 0);
        });

        it('should equal 0 on char', () => {
            assert.strictEqual(int('a'), 0);
        });

        it('should equal 0 on NaN', () => {
            assert.strictEqual(int(NaN), 0);
        });

        it('should equal 0 on null', () => {
            assert.strictEqual(int(null), 0);
        });

        it('should equal 0 on array', () => {
            assert.strictEqual(int([]), 0);
        });

        it('should equal 0 on object', () => {
            assert.strictEqual(int({}), 0);
        });

        it('should equal 0 on undefined', () => {
            assert.strictEqual(int(undefined), 0);
        });

        it('should equal 1 on true', () => {
            assert.strictEqual(int(true), 1);
        });

        it('should equal 0 on false', () => {
            assert.strictEqual(int(false), 0);
        });

    });
    });
});
