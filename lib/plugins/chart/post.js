'use strict';

const Promise = require('bluebird');
const PackageMeta = require('../../../package.json');
const Helpers = require('../../helpers');

const Plugin = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/chart',
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
                subRepo : request.payload.subRepo,
                fileName : request.payload.chart.filename,
                filePath : request.payload.chart.path,
                uploadKey : request.payload.subRepo ? `${request.payload.subRepo}/${request.payload.chart.filename}` : request.payload.chart.filename,
                indexKey : request.payload.subRepo ? `${request.payload.subRepo}/index.yaml` : 'index.yaml',
                indexExist : false,
                tmpFolderPath : null,
                tmpChartPath : null,
                tmpIndexPath : null
            };

            Promise
                .resolve()
                .bind(context)
                .then(Helpers.chartExist)
                .then(Helpers.createTempDirectory)
                .then(Helpers.copyToTempDirectory)
                .then(Helpers.uploadChart)
                .then(Helpers.downloadIndex)
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
    name : 'chart-post',
    version : PackageMeta.version
};

module.exports = Plugin;
