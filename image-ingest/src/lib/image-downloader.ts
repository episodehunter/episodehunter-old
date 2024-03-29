'use strict';

const got = require('got');
const fs = require('fs');
const gm = require('gm');
import util from './utility';

function imageDownloader(url: string, toPath: string): Promise<string> {
    const name = `${util.generateRandomName()}.jpg`;
    const path = `${toPath}${name}`;

    return new Promise((resolve, reject) => {
        const ws = fs.createWriteStream(path);
        ws.on('error', reject);
        ws.on('finish', () => resolve(name));
        got.stream(url, {
            timeout: 3000
        })
        .on('error', error => {
            fs.unlink(path);
            reject(error);
        })
        .pipe(ws);
    });
}

function resize(url: string, toPath: string, w: number, h: number): Promise<string> {
    const name = `${util.generateRandomName()}.jpg`;
    const path = `${toPath}${name}`;

    return new Promise((resolve, reject) => {
        const stream = got.stream(url, {
            timeout: 3000
        })
        .on('error', reject);

        gm(stream, name)
            .resizeExact(w, h)
            .write(path, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve(name);
                }
            });
    });
}

export {imageDownloader, resize};
export default {imageDownloader, resize};
