'use strict';

const Path = require('path');

const pathBuilder = (path) => {

    return Path.isAbsolute(path)
        ? path
        : Path.join(process.env.PWD, path);
};

module.exports = pathBuilder;
