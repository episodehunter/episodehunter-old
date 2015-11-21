import {expect, assert} from 'chai';
import {MissingShowError} from '../../error/missing-show.error';

describe('Error', () => {

    describe('Missing show error', () => {

        it('Should throw an valid error', () => {
            // Arrange
            let fn = () => { throw new MissingShowError(); };

            // Assert
            expect(fn).to.throw(MissingShowError);
            expect(fn).to.throw(Error);
            expect(fn).to.throw('Can not find show');
        });

        it('Should have a valid name', () => {
            // Arrange
            let error = new MissingShowError();

            // Assert
            assert.equal(error.name, 'MissingShowError');
        });

    });

});
