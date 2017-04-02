import 'reflect-metadata';
import { createConnection, getEntityManager, Connection } from 'typeorm';
import * as entities from './entity';

function connect({host, port, username, password, database}): Promise<Connection> {
    return createConnection({
        driver: {
            type: 'mysql',
            host,
            port,
            username,
            password,
            database,
            extra: {
                ssl: 'Amazon RDS'
            }
        },
        entities: [
            __dirname + '/entity/*.js'
        ],
        autoSchemaSync: false
    });
}

export { connect, entities, getEntityManager, Connection };
