'use strict';

import Hapi = require('hapi');
import {registerJWT} from './jwt';

function registerPlugin(server: Hapi.Server) {
    registerJWT(server);
}

export {registerPlugin};
