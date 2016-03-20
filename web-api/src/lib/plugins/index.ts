import { registerJWT } from './jwt/jwt';

function registerPlugin(server) {
    registerJWT(server);
}

export { registerPlugin };
