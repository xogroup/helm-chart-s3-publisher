'use strict';

const Promise = require('bluebird');
const PackageMeta = require('../../../package.json');
const Helpers = require('../../helpers');

const Plugin = function (server, options, next) {

    const assetHandler = function (request, reply) {

        const context = {
            server,
            request,
            reply,
            options,
            subRepo : request.params.subRepo,
            downloadKey : request.path.substr(1)
        };

        Promise
            .resolve()
            .bind(context)
            .then(Helpers.downloadObject)
            .catch(Helpers.handleError);
    };

    server.route({
        method: 'GET',
        path: '/index.yaml',
        handler: assetHandler
    });

    server.route({
        method: 'GET',
        path: '/{chartName}.tgz',
        handler: assetHandler
    });

    server.route({
        method: 'GET',
        path: '/{subRepo}/index.yaml',
        handler: assetHandler
    });

    server.route({
        method: 'GET',
        path: '/{subRepo}/{chartName}.tgz',
        handler: assetHandler
    });

    next();
};

Plugin.attributes = {
    name : 'static-get',
    version : PackageMeta.version
};

module.exports = Plugin;