'use strict';
const Config = require('./helpers').Config;
const config = new Config(process.env, process.argv);

const userInput = {
    host : config.get('host'),
    port : config.get('port'),
    region : config.get('region'),
    accessKey : config.get('accessKey'),
    secretKey : config.get('secretKey'),
    bucket : config.get('bucket')
};

const manifest = {
    server : {
        app : {
            slogan : 'helm-chart-s3-publisher'
        }
    },
    connections : [
        {
            host : config.get('host'),
            port : config.get('port'),
            labels : ['web']
        }
    ],
    registrations : [
        {
            plugin : {
                register : 'good',
                options : {
                    reporters : {
                        console : [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ log: '*', response: '*' }]
                            },{
                                module: 'good-console'
                            }, 'stdout'
                        ]
                    }
                }
            },
            options : {
                select : ['web']
            }
        },
        {
            plugin : {
                register : './plugins/chart/post',
                options : {
                    input : userInput
                }
            },
            options : {
                select : ['web']
            }
        },
        {
            plugin : {
                register : './plugins/chart/put',
                options : {
                    input : userInput
                }
            },
            options : {
                select : ['web']
            }
        },
        {
            plugin : {
                register : './plugins/index/rebuild',
                options : {
                    input : userInput
                }
            },
            options : {
                select : ['web']
            }
        }
    ]
};

module.exports = manifest;
