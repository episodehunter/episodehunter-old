'use strict';

var registeredDependencies = {};

var dependencyInjection = function(cls, depth) {
    if (typeof cls !== 'function') {
        return cls;
    }
    if (depth >= 10) {
        throw new Error('IoC: Too many dependencies');
    }
    if (!Array.isArray(cls.inject)) {
        return new cls();
    }

    var dependencies = cls.inject.map(function(dep) {
        return dependencyInjection(registeredDependencies[dep], depth+1);
    });
    dependencies.unshift(null);

    return new (cls.bind.apply(cls, dependencies))();
};

var register = function(name, obj) {
    registeredDependencies[name] = obj;
};

module.exports = {
    inject: dependencyInjection,
    register: register
};
