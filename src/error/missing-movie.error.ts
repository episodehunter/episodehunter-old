function MissingMovieError(message?: string) {
    this.name = 'MissingMovieError';
    this.message = message || 'Can not find movie';
    this.stack = (new Error())['stack'];
}
MissingMovieError.prototype = Object.create(Error.prototype);
MissingMovieError.prototype.constructor = MissingMovieError;

export {MissingMovieError};
