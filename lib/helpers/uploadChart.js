'use strict';

const AWS = require('./aws');
const S3 = new AWS.S3();
const Fs = require('fs');

const uploadChart = function () {

    const self = this;

    return S3
        .putObject({
            Bucket : this.options.input.bucket,
            Key : this.uploadKey,
            ACL : this.options.input.canacl,
            Body: Fs.createReadStream(self.tmpChartPath)
        })
        .promise()
        .then((result) => {

            self.server.log(['debug'], `uploaded ${self.uploadKey}`);
            self.server.log(['debug'], result);
        });
};

module.exports = uploadChart;
