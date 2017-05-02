'use strict';

const Exec = require('child_process').exec;
const Promise = require('bluebird');

const helmIndexMerge = function () {

    const self = this;

    const mergeSwitch = `--marge ${this.tmpIndexPath}`;
    const urlSwitch = `--url ${this.options.input.url}`;

    const command = this.indexExist
        ? `helm repo index ${self.tmpFolderPath} ${mergeSwitch} ${urlSwitch}`
        : `helm repo index ${self.tmpFolderPath} ${urlSwitch}`;

    return new Promise((resolve, reject) => {

        Exec(command, (err, stdout) => {

            if (err) {
                return reject(err);
            }

            self.server.log(['debug'], 'index.yaml file updated');
            return resolve();
        });
    });
};

module.exports = helmIndexMerge;
