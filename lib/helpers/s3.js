'use strict';

const AWS = require('./aws');

module.exports = new AWS.S3({
    signatureVersion: 'v4'
});