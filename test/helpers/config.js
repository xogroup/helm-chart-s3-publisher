'use strict';

const Path = require('path');
const Code = require('code');
const Lab = require('lab');
const Config = require('../../lib/helpers/config');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const expect = Code.expect;

describe('configuration', () => {

    describe('no input', () => {

        let config = null;

        before((done) => {

            config = new Config();
            done();
        });

        it('should return safe defaults', (done) => {

            expect(config.get('host')).to.be.equal('127.0.0.1');
            expect(config.get('port')).to.be.equal(8080);
            expect(config.get('accessKey')).to.be.null();
            expect(config.get('secretKey')).to.be.null();
            expect(config.get('bucket')).to.be.null();

            done();
        });
    });

    describe('env', () => {

        const processEnv = {
            HOST : '0.0.0.0',
            PORT : '8090',
            ACCESSKEY : 'abc01234def',
            SECRETKEY : 'fed43210cba',
            BUCKET : 'test-bucket'
        };
        let config = null;

        before((done) => {

            config = new Config(processEnv);
            done();
        });

        it('should match environment variables', (done) => {

            expect(config.get('host')).to.be.equal(processEnv.HOST);
            expect(config.get('port')).to.be.equal(parseInt(processEnv.PORT));
            expect(config.get('accessKey')).to.be.equal(processEnv.ACCESSKEY);
            expect(config.get('secretKey')).to.be.equal(processEnv.SECRETKEY);
            expect(config.get('bucket')).to.be.equal(processEnv.BUCKET);

            done();
        });
    });

    describe('file', () => {

        const processArgv = [
            '/usr/local/bin/node',
            'helm-chart-s3-publisher',
            '-f',
            Path.join(process.cwd(), '/test/mocks/config.json')
        ];

        let config = null;

        before((done) => {

            config = new Config(null, processArgv);
            done();
        });

        it('should match file configuration contents', (done) => {

            expect(config.get('host')).to.be.equal('0.0.0.1');
            expect(config.get('port')).to.be.equal(8070);
            expect(config.get('accessKey')).to.be.equal('xyz09876cba');
            expect(config.get('secretKey')).to.be.equal('abc67890zyx');
            expect(config.get('bucket')).to.be.equal('test-bucket-2');
            done();
        });
    });

    describe('argv', () => {

        const processArgv = [
            '/usr/local/bin/node',
            'helm-chart-s3-publisher',
            '-h',
            '0.0.0.0',
            '-p',
            '8090',
            '-a',
            'abc01234def',
            '-s',
            'fed43210cba',
            '-b',
            'test-bucket'
        ];

        let config = null;

        before((done) => {

            config = new Config(null, processArgv);
            done();
        });

        it('should match environment variables', (done) => {

            expect(config.get('host')).to.be.equal(processArgv[3]);
            expect(config.get('port')).to.be.equal(parseInt(processArgv[5]));
            expect(config.get('accessKey')).to.be.equal(processArgv[7]);
            expect(config.get('secretKey')).to.be.equal(processArgv[9]);
            expect(config.get('bucket')).to.be.equal(processArgv[11]);

            done();
        });
    });
});
