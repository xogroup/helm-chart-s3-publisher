'use strict';

const S3 = require('./s3');
const Fs = require('fs');

const uploadIndex = function () {

    const self = this;

    return S3
        .putObject({
            Bucket : this.options.input.bucket,
            Key : this.indexKey,
            ACL : this.options.input.canacl,
            Body: Fs.createReadStream(this.tmpIndexPath)
        })
        .promise()
        .then((result) => {

            self.server.log(['debug'], `uploaded ${self.indexKey}`);
            self.server.log(['debug'], result);
        });
};

module.exports = uploadIndex;
