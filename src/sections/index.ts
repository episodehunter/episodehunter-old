'use strict';

import Hapi = require('hapi');
import {authRouts} from './auth/auth-router';
import {movieRouts} from './movies/movie-router';
import {seriesRouts} from './series/series-router';

function registerRouts(server: Hapi.Server) {
    server.route(authRouts);
    server.route(movieRouts);
    server.route(seriesRouts);
}

export {registerRouts};
