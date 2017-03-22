'use strict';

const Promise = require('bluebird');
const AWS = require('aws-sdk');
const S3 = new AWS.S3();

const pageResults = function (options, keys, continuationToken, cb) {

    S3.listObjectsV2(options, (err, result) => {

        if (err) {
            return cb(err);
        }

        result.Contents.forEach((content) => {

            if (content.Key.endsWith('.tgz')) {
                keys.push(content.Key);
            }
        });

        if (result.NextContinuationToken) {
            pageResults(options, keys, result.NextContinuationToken, cb);
        }
        else {
            cb(null, keys);
        }
    });
};

const pageResultsAsync = function (options) {

    const self = this;

    return new Promise((resolve, reject) => {

        pageResults(options, [], null, (err, s3Keys) => {

            if (err) {
                return reject(err);
            }

            self.syncChartKeys = s3Keys;
            resolve();
        });
    });
};

const syncChartKeys = function () {

    const listOptions = {
        Bucket : this.options.input.bucket,
        Delimiter : '/',
        Prefix : ''
    };

    if (this.request.payload.subRepo) {
        listOptions.Prefix = `${this.request.payload.subRepo}/`;
    }

    return Promise
        .resolve()
        .bind(this)
        .then(pageResultsAsync.bind(this, listOptions))
        .then(function () {

            this.server.log(['debug'], `Found ${this.syncChartKeys.length} chart(s)`);
        });
};

module.exports = syncChartKeys;
