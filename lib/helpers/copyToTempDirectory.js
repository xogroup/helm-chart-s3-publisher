'use strict';

const Fs = require('fs-extra');
const Promise = require('bluebird');

const copyToTempDirectory = function () {

    const self = this;

    return new Promise((resolve, reject) => {

        Fs.copy(self.filePath, self.tmpChartPath, (err) =>  {

            if (err) {
                self.server.log(['error'], err);
                return reject(err);
            }

            self.server.log(['debug'], 'copied');
            return resolve();
        });
    });
};

module.exports = copyToTempDirectory;
