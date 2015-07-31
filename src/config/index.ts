import {configInterface} from './config-interface';
import {config as defaultConfig} from './default';
import {config as localConfig} from './local';
import {defaultsDeep} from 'lodash';

const production = false;

const config = defaultsDeep<Object, configInterface>(localConfig, defaultConfig);

export {config};
