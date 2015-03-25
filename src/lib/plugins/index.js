var registerJWT = require('./jwt');

module.exports = {
    register: server => {
        registerJWT(server);
    }
};