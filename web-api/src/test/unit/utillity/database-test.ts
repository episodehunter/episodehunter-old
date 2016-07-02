import { test } from 'ava';
import { as } from '../../../lib/utility/database';

test('should create a as statement', t => {
    // Arrange
    const column = 'name';
    const newName = 'title';

    // Act
    const result = as(column, newName);

    t.is(result, 'name as title');
});
