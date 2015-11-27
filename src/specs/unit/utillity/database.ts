import {assert} from 'chai';
import {as} from '../../../lib/utility/database';

describe('Utillity', () => {

    describe('Database', () => {

        it(`Should correct as statement`, () => {
            // Arrange
            let column = 'name';
            let newName = 'title';

            // Act
            let result = as(column, newName);

            assert.strictEqual(result, 'name as title');
        });

    });
});
