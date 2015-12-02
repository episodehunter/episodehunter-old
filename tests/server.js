'use strict';

import http from 'http';
import pify from 'pify';
import getPort from 'get-port';

const host = 'localhost';

function createServer() {
    return getPort().then(function (port) {
        var s = http.createServer(function (req, resp) {
            s.emit(req.url, req, resp);
        });

        s.host = host;
        s.port = port;
        s.url = 'http://' + host + ':' + port;
        s.protocol = 'http';

        s.listen = pify(s.listen, Promise);
        s.close = pify(s.close, Promise);

        return s;
    });
}

export default createServer;
export {createServer};
