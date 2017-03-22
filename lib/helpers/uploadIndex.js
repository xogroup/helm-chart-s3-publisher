'use strict';

const AWS = require('./aws');
const S3 = new AWS.S3();
const Fs = require('fs');

const uploadIndex = function () {

    const self = this;

    return S3
        .putObject({
            Bucket : this.options.input.bucket,
            Key : this.indexKey,
            ACL : 'public-read',
            Body: Fs.createReadStream(this.tmpIndexPath)
        })
        .promise()
        .then((result) => {

            self.server.log(['debug'], `uploaded ${self.indexKey}`);
            self.server.log(['debug'], result);
        });
};

module.exports = uploadIndex;
