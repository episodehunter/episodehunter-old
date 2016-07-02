import { test } from 'ava';
import { int, parseJson } from '../../../lib/utility/type-conversion';

test(`'int' should return the value of an string integer`, t => {
    t.is(int('1'), 1);
});

test(`'int' should truncate the value of an float and return an integer`, t => {
    t.is(int('1.9'), 1);
});

test(`'int' should handle negative strings value`, t => {
    t.is(int('-1'), -1);
});

test(`'int' should equal 0 on non-numeric-strings`, t => {
    t.is(int('Not a number'), 0);
});


test(`'int' should truncate the value of an float and return an integer`, t => {
    t.is(int('1.9'), 1);
});

test(`'int' should handle negative strings value`, t => {
    t.is(int('-1'), -1);
});

test(`'int' should equal 0 on non-numeric-strings`, t => {
    t.is(int('Not a number'), 0);
});

test(`'int' should equal 0 on char`, t => {
    t.is(int('a'), 0);
});

test(`'int' should equal 0 on NaN`, t => {
    t.is(int(NaN), 0);
});

test(`'int' should equal 0 on null`, t => {
    t.is(int(null), 0);
});

test(`'int' should equal 0 on array`, t => {
    t.is(int([]), 0);
});

test(`'int' should equal 0 on object`, t => {
    t.is(int({}), 0);
});

test(`'int' should equal 0 on undefined`, t => {
    t.is(int(undefined), 0);
});

test(`'int' should equal 1 on true`, t => {
    t.is(int(true), 1);
});

test(`'int' should equal 0 on false`, t => {
    t.is(int(false), 0);
});

test(`'parseJson' should parse a string`, t => {
    // Arrange
    const obj = '{"a":1}';

    // Act
    const result = parseJson(obj);

    // Assert
    t.deepEqual(result, {a: 1});
});

test(`'parseJson' should return undefined for en invalid string`, t => {
    // Arrange
    const obj = '{"a":1';

    // Act
    const result = parseJson(obj);

    // Assert
    t.is(result, undefined);
});
