'use strict';

const S3 = require('./s3');
const Boom = require('boom');

const downloadObject = function () {

    const self = this;

    return new Promise((resolve, reject) => {

        const stream = S3
            .getObject({
                Bucket : self.options.input.bucket,
                Key : self.downloadKey
            })
            .createReadStream();

        stream.on('error', (err) => {

            if (err.code === 'NoSuchKey') {
                self.server.log(['warn'], `No ${self.downloadKey} found`);
                resolve();
            }
            else {
                reject(err);
            }
        });

        stream.on('close', resolve);

        self.reply(null, stream);
    });
};

module.exports = downloadObject;
