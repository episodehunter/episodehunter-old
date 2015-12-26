
let decorateResponse = server => {

    server.ext('onPreResponse', (request, reply) => {
        if (request && request.response && request.response.header && typeof request.id === 'string') {
            request.response.header('request-id', request.id.split(':')[0]);
        }
        reply.continue();
    });

};

export {decorateResponse};
