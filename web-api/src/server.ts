import { Server } from 'hapi';
import { connect as queueConnect } from 'episodehunter-queue';
import {registerRouts} from './sections/index';
import {registerPlugin} from './lib/plugins/index';
import {registerLogger} from './lib/logger';
import {decorateResponse} from './lib/decorate-response';
import config from './config';

const server = new Server(<any>{
    load: {
        sampleInterval: 1000,
    },
    connections: {
        load: {
            maxEventLoopDelay: 3000
        }
    }
});

server.connection({
    port: config.port,
    routes: {
        cors: true
    }
});

registerPlugin(server);
registerRouts(server);
registerLogger(server);
decorateResponse(server);

// Only start the server if we run the script directly
if (!module.parent) {
    queueConnect(config.redis);

    server.start(() => {
        console.log('Server running at:', server.info.uri);
    });
}

export { server };
