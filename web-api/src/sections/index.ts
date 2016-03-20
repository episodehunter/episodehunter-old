import { Server } from 'hapi';
import { authRouts } from './auth/auth-router';
import { movieRouts } from './movies/movie-router';
import { showRouts } from './show/show-router';
import { userRouts } from './user/user-router';
import { popularRouts } from './popular/popular-router';
import { searchRoute } from './search/search-router';

function registerRouts(server: Server) {
    server.route(authRouts);
    server.route(movieRouts);
    server.route(showRouts);
    server.route(userRouts);
    server.route(popularRouts);
    server.route(searchRoute);
}

export { registerRouts };
