'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000
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
        path: '/login',
        handler: (request, h) => {
            return 'Login';
        }
    },
    {
        method: 'GET',
        path: '/signup',
        handler: (request, h) => {
            return 'Create Account';
        }
    }
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
