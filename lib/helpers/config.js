'use strict';

const Fs = require('fs');
const PathBuilder = require('./pathBuilder');
const PackageMeta = require('../../package.json');
const Args =  require('commander')
    .version(PackageMeta.version)
    .option('-H, --host <host>', 'host address to listen with')
    .option('-P, --port <port>', 'port to listen with', parseInt)
    .option('-r, --region <string>', 'AWS region (defaults to us-east-1')
    .option('-a, --accessKey <token>', 'AWS access key')
    .option('-s, --secretKey <token>', 'AWS secret key')
    .option('-b, --bucket <string>, AWS S3 Bucket')
    .optino('-u, --url <string>, host + path Url to build the canonical chart link with')
    .option('-f, --file <path>, Path to configuration file');

const defaults = {
    host : '0.0.0.0',
    port : 8080,
    region : 'us-east-1',
    accessKey : null,
    secretKey : null,
    bucket : null
};

class Config {

    constructor(processEnv, processArgv) {

        this._env = processEnv || {};
        this._argv = Args.parse(processArgv || process.argv.slice(0, 2));
        this._file = this._argv.file ? JSON.parse(Fs.readFileSync(PathBuilder(this._argv.file), { encoding : 'utf8' })) : {};
    }

    get(name) {

        switch (name) {
            case 'host':
            case 'port':
            case 'region':
            case 'accessKey':
            case 'secretKey':
            case 'bucket':
            case 'url':
                return this._get(name);
                break;
            default:
                return null;
        }
    }

    _get(name) {

        if (this._argv && this._argv[name]) {
            return this._argv[name];
        }

        if (this._env && this._env[name.toUpperCase()]) {
            switch (name) {
                case 'port':
                    return parseInt(this._env[name.toUpperCase()]);
                default:
                    return this._env[name.toUpperCase()];
            }
        }

        if (this._file && this._file[name]) {
            switch (name) {
                case 'port':
                    return parseInt(this._file[name]);
                default:
                    return this._file[name];
            }
        }

        return defaults[name];
    }
}

module.exports = Config;
