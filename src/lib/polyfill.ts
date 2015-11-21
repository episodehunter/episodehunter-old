'use strict';

const metadataContainerKey = '__metadata__';
var emptyMetadata = Object.freeze({});

// The following object was taken from the aurelia project.
// https://github.com/aurelia/metadata/blob/c40cfcb87c3c788f607d3ff67bf494ca05f5be15/src/metadata.js#L31-51
// Copyright (c) 2014 Durandal Inc.
var _Reflect = {
    getOwnMetadata: function(metadataKey, target, targetKey?) {
        return ((target[metadataContainerKey] || emptyMetadata)[targetKey] || emptyMetadata)[metadataKey];
    },
    defineMetadata: function(metadataKey, metadataValue, target, targetKey) {
        var metadataContainer = target[metadataContainerKey] || (target[metadataContainerKey] = {});
        var targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
        targetContainer[metadataKey] = metadataValue;
    },
    metadata: function(metadataKey, metadataValue) {
        return function(target, targetKey) {
            _Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
        };
    }
};

global['Reflect'] = _Reflect;
