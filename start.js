const queue = require('episodehunter-queue');

const config = {
    prefix: 'eh',
    redis: {
        port: 6379,
        host: '127.0.0.1'
    },
    serverPort: 3000
};

queue.connect(config);
queue.__kue.app.listen(config.serverPort);

console.log(`Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come`);

console.log(`The server is listening on ${config.serverPort}`)
