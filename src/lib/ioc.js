'use strict';

var registeredDependencies = {};

var dependencyInjection = function(Cls, depth) {
    if (typeof Cls !== 'function') {
        return Cls;
    }
    if (depth >= 10) {
        throw new Error('IoC: Too many dependencies');
    }
    if (!Array.isArray(Cls.inject)) {
        return new Cls();
    }

    var dependencies = Cls.inject.map(function(dep) {
        if (!registeredDependencies[dep]) {
            throw new Error('IoC: Couldn\'t find: ' + dep + '. Make sure you have registered it');
        }
        return dependencyInjection(registeredDependencies[dep], depth+1);
    });
    dependencies.unshift(null);

    return new (Cls.bind.apply(Cls, dependencies))();
};

var register = function(name, obj) {
    registeredDependencies[name] = obj;
};

module.exports = {
    inject: dependencyInjection,
    register: register
};
