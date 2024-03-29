'use strict';
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const Hapi = require('@hapi/hapi');
const Path = require('path');
const Ejs = require('ejs');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    let rootUrl = {
        "staging": "https://d140afm9bvkdb9.cloudfront.net",
        "dev": "",
        "prod": "https://dicpcx7medw71.cloudfront.net"
    };

    await server.register(Vision);
    await server.register(Inert);

    server.views({
        engines: { ejs: Ejs },
        relativeTo: __dirname,
        path: 'views'
    });

    server.route([
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.view('index');
        }
    },
    {
        method: 'GET',
        path: '/app/{param*}',
        handler: (request, h) => {
            return h.view('app', { 
                root: rootUrl[process.env.ENV],
                priceIds: {
                    indiaAnnual: process.env.INDIA_PRICEID,
                    globalAnnual: process.env.GLOBAL_PRICEID
                },
                filename: process.env.BUNDLE_NAME
            });
        }
    },
    {
        method: 'GET',
        path: '/robots.txt',
        handler: async (request, h) => {
            return h.file('robots.txt');
        }
    },
    {
        method: 'GET',
        path: '/images/{param*}',
        handler: {
            directory: {
                path: './images',
                redirectToSlash: true
            }
        }
    },
    {
        method: 'GET',
        path: '/js/{param*}',
        handler: {
            directory: {
                path: './js',
                redirectToSlash: true
            }
        }
    },
    {
        method: 'GET',
        path: '/css/{param*}',
        handler: {
            directory: {
                path: './css',
                redirectToSlash: true
            }
        }
    },
    {
        method: 'GET',
        path: '/login',
        handler: async (request, h) => {
            return h.view('login');
        }
    },
    {
        method: 'GET',
        path: '/how-it-works',
        handler: async (request, h) => {
            return h.view('features');
        }
    },
    {
        method: 'GET',
        path: '/pricing',
        handler: async (request, h) => {
            return h.view('pricing');
        }
    },
    {
        method: 'GET',
        path: '/about',
        handler: async (request, h) => {
            return h.view('about');
        }
    },
    {
        method: 'GET',
        path: '/privacy',
        handler: async (request, h) => {
            return h.view('privacy');
        }
    },
    {
        method: 'GET',
        path: '/signup',
        handler: (request, h) => {
            return h.view('signup'); 
        }
    },
    {
        method: 'GET',
        path: '/join',
        handler: (request, h) => {
            return h.view('join_team'); 
        }
    }
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
