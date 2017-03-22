'use strict';

const Fs = require('fs');
const Promise = require('bluebird');
const PackageMeta = require('../../package.json');

const createTempDirectory = function () {

    const self = this;

    return new Promise((resolve, reject) => {

        Fs.mkdtemp(`/tmp/${PackageMeta.name}-`, (err, folder) => {

            if (err) {
                return reject(err);
            }

            self.tmpFolderPath = folder;
            self.tmpChartPath = `${folder}/${self.fileName}`;
            self.tmpIndexPath = `${folder}/index.yaml`;
            return resolve();
        });
    });
};

module.exports = createTempDirectory;
