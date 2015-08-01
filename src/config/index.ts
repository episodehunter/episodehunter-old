import {configInterface} from './config-interface';
import {config as defaultConfig} from './default';
import {config as localConfig} from './local';
import {config as productionConfig} from './production';
import {defaultsDeep} from 'lodash';

const production = false;
const config: configInterface = buildConfig(production);

function buildConfig(production) : configInterface {
    if (production) {
        return defaultsDeep<Object, configInterface>(productionConfig, defaultConfig);
    } else {
        return defaultsDeep<Object, configInterface>(localConfig, defaultConfig);
    }
}

export {config};
