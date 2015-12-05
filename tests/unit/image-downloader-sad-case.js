'use strict';

import {assert} from 'chai';
import {imageDownloader, resize} from '../../dist/lib/image-downloader';
import {createServer} from '../server';

describe('Image downloader', () => {

    let server;

    before(async () => {
        server = await createServer();

        server.on('/', (req, res) => {
            res.statusCode = 404;
            res.end('This is the end');
        });

        await server.listen(server.port);
    });

    after(async () => {
        await server.close();
    });

    it('Should reject when 404', async () => {
        try {
            await imageDownloader(server.url, './');
            throw new Error(`Why won't you just die //Joker`);
        } catch(error) {
            assert.include(error.message, '404', 'The error message should tell us about 404');
        }
    });

    it('Should reject when 404 for resize', async () => {
        try {
            await resize(server.url, './');
            throw new Error(`Why won't you just die //Joker`);
        } catch(error) {
            assert.include(error.message, '404', 'The error message should tell us about 404');
        }
    });
});
