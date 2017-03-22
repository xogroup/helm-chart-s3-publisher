'use strict';

const Promise = require('bluebird');
const PackageMeta = require('../../../package.json');
const Helpers = require('../../helpers');

const Plugin = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/index/rebuild',
        config: {
            payload : {
                output: 'file',
                parse: true
            }
        },
        handler: function (request, reply) {

            const context = {
                server,
                request,
                reply,
                options,
                indexExist : false,
                subRepo : request.payload.subRepo,
                indexKey : request.payload.subRepo ? `${request.payload.subRepo}/index.yaml` : 'index.yaml',
                tmpFolderPath : null,
                tmpIndexPath : null,
                syncChartKeys : []
            };

            Promise
                .resolve()
                .bind(context)
                .then(Helpers.createTempDirectory)
                .then(Helpers.syncChartKeys)
                .then(Helpers.downloadCharts)
                .then(Helpers.helmIndexMerge)
                .then(Helpers.uploadIndex)
                .then(Helpers.cleanup)
                .then(Helpers.reply)
                .catch(Helpers.handleError);
        }
    });

    next();
};

Plugin.attributes = {
    name : 'index-rebuild',
    version : PackageMeta.version
};

module.exports = Plugin;
