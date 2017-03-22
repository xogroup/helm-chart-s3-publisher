'use strict';

const Boom = require('boom');

const handleError = function (err) {

    this.server.log(['error'], err);
    this.reply(Boom.wrap(err, 500));
};

module.exports = handleError;
