'use strict';

const Promise = require('bluebird');
const S3 = require('./s3');

const chartExist = function () {

    const self = this;

    return new Promise((resolve, reject) =>  {

        S3
            .getObject({
                Bucket : this.options.input.bucket,
                Key : this.uploadKey
            },
            (err, data) => {

                if (err) {
                    if (err.code === 'NoSuchKey') {
                        self.server.log(['debug'], 'chart does not exist');
                        return resolve();
                    }

                    return reject(err);
                }

                reject(new Error('chart already exist'));
            });
    });
};

module.exports = chartExist;
