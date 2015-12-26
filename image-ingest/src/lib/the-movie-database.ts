'use strict';

const got = require('got');
import config from '../config';

const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = config.image.moviedb.apiKey;
let configuration: any = undefined;

function getConfiguration(): Promise<any> {
    if (configuration === undefined) {
        return got(buildUrl('configuration'), {
            json: true,
            timeout: 3000
        })
        .then(({body}) => {
            configuration = body;
            return configuration;
        });
    } else {
        return Promise.resolve(configuration);
    }
}

function getBaseImageUrl(): Promise<string> {
    return getConfiguration()
        .then(config => {
            return config.images.base_url;
        });
}

function buildUrl(path) {
    return `${baseUrl}${path}?api_key=${apiKey}`;
}

export {getConfiguration, getBaseImageUrl};
export default {getConfiguration, getBaseImageUrl};
