'use strict';

const AWS = require('aws-sdk');
const Config = require('./config');
const config = new Config(process.env, process.argv);

AWS.config.update({
    accessKeyId: config.get('accessKey'), 
    secretAccessKey: config.get('secretKey'),
    region : config.get('region')
});

AWS.config.setPromisesDependency(require('bluebird'));

module.exports = AWS;
