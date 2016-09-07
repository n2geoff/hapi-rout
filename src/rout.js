'use strict';

function prefixer(prefix) {

    if (typeof prefix !== 'string') {
        throw new Error('rout prefix must be a "string"');
    }

    if (prefix[0] !== '/' && prefix.length <= 2) {
        throw new Error('rout prefix cannot be blank or just "/". use "server.route" instead');
    }

    return prefix;
}

let rout = {
    register: (server, options, next) => {

        server.decorate('server', 'rout', function (prefix, routes) {

            //both arguments required
            if(arguments.length < 2) {
                throw new Error('server.rout expects 2 arguments: prefix, routes');
            }

            //prefix format check
            prefix = prefixer(prefix);

            //todo: check routes struct
            routes = Array.isArray(routes) ? routes : [];

            let final = routes.map(function (route) {
                route.path = prefix + route.path;
                return route;
            });

            server.route(final);
        });

        next();
    }
}

rout.register.attributes = {
    name: 'rout',
    version: '1.0.0'
}

module.exports = rout;


function a(one, two) {
    console.log(arguments);
    console.log(arguments.length);
}
