process.env.NODE_ENV = 'test';

import {server} from '../../server';
import {Server} from 'hapi';

interface plugin { (options: any): any; attributes: any; }
interface TestServer extends Server { injectThen(options: any): Promise<any> }

const injectThenRegister = <plugin>function (server, _options, next) {
    const injectThen = function(options) {
        return new Promise(resolve => {
            server.inject(options, resolve);
        });
    };

    if (!server.injectThen) {
        server.decorate('server', 'injectThen', injectThen);
    }

    next();
};

injectThenRegister.attributes = {
    name: 'injectThen',
    version: '1.0.0'
};

server.register(injectThenRegister, err => {
    if (err) {
        throw new Error(err);
    }
});

const testServer: TestServer = <any>server;

export {testServer as server};
