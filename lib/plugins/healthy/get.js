'use strict';

const Promise = require('bluebird');
const PackageMeta = require('../../../package.json');
const Helpers = require('../../helpers');

const Plugin = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/healthy',
        handler: function (request, reply) {

            const context = {
                server,
                request,
                reply
            };

            Promise
                .resolve()
                .bind(context)
                .then(Helpers.reply)
                .catch(Helpers.handleError);
        }
    });

    next();
};

Plugin.attributes = {
    name : 'healthy-get',
    version : PackageMeta.version
};

module.exports = Plugin;