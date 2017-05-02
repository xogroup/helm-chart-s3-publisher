'use strict';

const Glue     = require('glue');
const Manifest = require('./manifest');
const PackageMeta = require('../package.json');

Glue.compose(
    Manifest,
    { relativeTo: __dirname },
    (err, server) => {

        if (err) {
            server.log(['error'], err);
            throw err;
        }

        server.start(() =>  {

            server.log(['info'], `${PackageMeta.name}@${PackageMeta.version} started`);
        });
    });
