import {configInterface} from './config-interface';
import {config as defaultConfig} from './default';
import {config as localConfig} from './local';
import {config as testConfig} from './test';
import {config as productionConfig} from './production';
import {defaultsDeep} from 'lodash';

const env = process.env.NODE_ENV;
const config: configInterface = buildConfig(env);

function buildConfig(env) : configInterface {
    if (env === 'production') {
        return defaultsDeep<Object, configInterface>(productionConfig, defaultConfig);
    } else if (env === 'test') {
        return defaultsDeep<Object, configInterface>(testConfig, defaultConfig);
    } else {
        return defaultsDeep<Object, configInterface>(localConfig, defaultConfig);
    }
}

export {config};
