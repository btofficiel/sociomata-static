'use strict';

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

            return 'Sociomata Homepage';
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
        path: '/signup',
        handler: (request, h) => {
            return h.view('signup');
        }
    },

    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
