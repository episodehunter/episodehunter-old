'use strict';
import {server} from '../../server';
import {Server} from 'hapi';

interface plugin { (options: any): any; attributes: any; }
interface TestServer extends Server { injectThen(options: any): Promise<any> }

process.env.NODE_ENV = 'test';

let injectThenRegister = <plugin>function (server, options, next) {
    let injectThen = function(options) {
        return new Promise(resolve => {
            server.inject(options, resolve);
        });
    }

    if (!server.injectThen) {
        server.decorate('server', 'injectThen', injectThen);
    }

    next();
};

injectThenRegister.attributes = {
    name: 'injectThen',
    version: '1.0.0'
}

server.register(injectThenRegister, err => {
    if (err) {
        throw new Error(err);
    }
});

let testServer: TestServer = <any>server;

export {testServer as server};
