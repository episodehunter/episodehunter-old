'use strict';

function MissingShowError(message?: string) {
    this.name = 'MissingShowError';
    this.message = message || 'Can not find show';
    this.stack = (new Error())['stack'];
}
MissingShowError.prototype = Object.create(Error.prototype);
MissingShowError.prototype.constructor = MissingShowError;

export {MissingShowError};
