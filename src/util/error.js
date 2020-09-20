const ExtensibleCustomError = require('extensible-custom-error');

exports.NoItemError = class NoItemError extends ExtensibleCustomError {
    constructor(message,...args) {
        super(message,...args);
        if (typeof message === 'string') this.str = message;
    }
};