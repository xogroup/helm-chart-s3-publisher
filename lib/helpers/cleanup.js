'use strict';

const Promise = require('bluebird');
const Fs = require('fs-extra');

const remove = (path) => {

    return new Promise((resolve, reject) => {

        Fs.remove(path, (err) =>  {

            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
};

const cleanup = function ()  {

    const self = this;
    const tasks = [];

    if (this.filePath) {
        tasks.push(remove(this.filePath));
    }

    if (this.tmpFolderPath) {
        tasks.push(remove(this.tmpFolderPath));
    }

    return Promise
        .all(tasks)
        .then(() => {

            self.server.log(['debug'], 'clean up finished');
        });
};

module.exports = cleanup;
