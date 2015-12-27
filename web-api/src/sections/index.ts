'use strict';

import Hapi = require('hapi');
import {authRouts} from './auth/auth-router';
import {movieRouts} from './movies/movie-router';
import {showRouts} from './show/show-router';
import {userRouts} from './user/user-router';

function registerRouts(server: Hapi.Server) {
    server.route(authRouts);
    server.route(movieRouts);
    server.route(showRouts);
    server.route(userRouts);
}

export {registerRouts};