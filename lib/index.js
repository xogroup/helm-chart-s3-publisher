'use strict';

const Glue     = require('glue');
const Manifest = require('./manifest');

Glue.compose(
    Manifest,
    { relativeTo: __dirname },
    (err, server) => {

        if (err) {
            server.log(['error'], err);
            throw err;
        }


        server.start(() =>  {

            server.log(['info'], 'Service started');
        });
    });
