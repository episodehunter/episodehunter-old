import { test } from 'ava';
import { extractYear, isValid, convertToUnixTimestamp, today } from '../../../lib/utility/dates';

test('extractYear should return the year for a date string', t => {
    // Arrange
    const date = '2015-08-26';

    // Act
    const result = extractYear(date);

    // Assert
    t.is(result, 2015);
});

test('extractYear should return zero if passing a falsy value', t => {
    // Arrange
    const date = undefined;

    // Act
    const result = extractYear(date);

    // Assert
    t.is(result, 0);
});

test('isValid should return true for a valid date', t => {
    // Arrange
    const date = new Date();

    // Act
    const result = isValid(date);

    // Assert
    t.true(result);
});

test('isValid should return false for a invalid date', t => {
    // Arrange
    const date = new Date('xxx');

    // Act
    const result = isValid(date);

    // Assert
    t.false(result);
});

test('convertToUnixTimestamp should return a unix timestap for a date', t => {
    // Arrange
    const date = new Date('2016-07-02');

    // Act
    const result = convertToUnixTimestamp(date);

    // Assert
    t.is(result, 1467417600);
});

test('today should return a format date string', t => {
    // Act
    const result = today();

    // Assert
    t.regex(result, /^(20[1-2][1-9])-(0?[1-9]|1[012])-\d{2}$/);
});
