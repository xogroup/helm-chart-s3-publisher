'use strict';

const Fs = require('fs');
const Promise = require('bluebird');
const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const Boom = require('boom');
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
                .then(() => {
                    reply('ok');
                })
                .catch((err) => {
                    server.log(['error'], err);
                    reply(Boom.wrap(err, 500));
                });
        }
    });

    next();
};

Plugin.attributes = {
    name : 'index-rebuild',
    version : PackageMeta.version
};

module.exports = Plugin;
