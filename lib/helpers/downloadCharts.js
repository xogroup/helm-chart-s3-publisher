'use strict';

const Promise = require('bluebird');
const AWS = require('./aws');
const S3 = new AWS.S3();
const Fs = require('fs');
const Path = require('path');

const downloadChart = function (key) {

    const self = this;

    return S3
        .getObject({
            Bucket : this.options.input.bucket,
            Key : key
        })
        .promise()
        .then((data) => {

            return new Promise((resolve, reject) => {

                const tmpChartFileName = self.request.payload.subRepo
                    ? key.replace(`${self.request.payload.subRepo}/`, '')
                    : key;
                const tmpChartFilePath = Path.join(self.tmpFolderPath, tmpChartFileName);

                Fs.writeFile(tmpChartFilePath, data.Body, (err) => {

                    if (err) {
                        return reject(err);
                    }

                    self.server.log(['debug'], `downloaded ${tmpChartFilePath}`);
                    return resolve();
                });
            });
        });
};

const downloadCharts = function () {

    return Promise
        .map(this.syncChartKeys, downloadChart.bind(this), { concurrency : 40 });
};

module.exports = downloadCharts;
