'use strict';

import Hapi = require('hapi');
import {registerRouts} from './sections/index';
import {registerPlugin} from './lib/plugins/index';
import {config} from './config/index';

var server = new Hapi.Server();

server.connection({
    port: config.port,
    routes: {
        cors: true
    }
});

registerPlugin(server);
registerRouts(server);


// Ony start the server if we run the script directly
if (!module.parent) {
    server.start(() => {
        console.log('Server running at:', server.info.uri);
    });
}

export {server};
