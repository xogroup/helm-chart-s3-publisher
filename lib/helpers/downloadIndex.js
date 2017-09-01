'use strict';

const S3 = require('./s3');
const Fs = require('fs');

const downloadIndex = function () {

    const self = this;

    return S3
        .getObject({
            Bucket : this.options.input.bucket,
            Key : this.indexKey
        })
        .promise()
        .then((data) => {

            self.indexExist = true;

            return new Promise((resolve, reject) => {

                Fs.writeFile(self.tmpIndexPath, data.Body, (err) => {

                    if (err) {
                        return reject(err);
                    }

                    self.server.log(['debug'], 'downloaded index.yaml');
                    return resolve();
                });
            });
        })
        .catch((err) => {

            if (err.code === 'NoSuchKey') {
                self.indexExist = false;
                self.server.log(['warn'], 'No index.yaml found');
            }
            else {
                self.server.log(['error'], err);
            }
        });
};

module.exports = downloadIndex;
