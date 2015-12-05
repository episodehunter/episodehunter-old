import {assert} from 'chai';
import {as} from '../../../lib/utility/database';

describe('Utillity', () => {

    describe('Database', () => {

        it(`Should correct as statement`, () => {
            // Arrange
            const column = 'name';
            const newName = 'title';

            // Act
            const result = as(column, newName);

            assert.strictEqual(result, 'name as title');
        });

    });
});
