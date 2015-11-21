import {expect, assert} from 'chai';
import {MissingMovieError} from '../../error/missing-movie.error';

describe('Error', () => {

    describe('Missing movie error', () => {

        it('Should throw an valid error', () => {
            // Arrange
            let fn = () => { throw new MissingMovieError(); };

            // Assert
            expect(fn).to.throw(MissingMovieError);
            expect(fn).to.throw(Error);
            expect(fn).to.throw('Can not find movie');
        });

        it('Should have a valid name', () => {
            // Arrange
            let error = new MissingMovieError();

            // Assert
            assert.equal(error.name, 'MissingMovieError');
        });

    });

});
