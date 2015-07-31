'use strict';

function dependencyInjection<T>(Cls, depth = 0): T {
    if (typeof Cls !== 'function') {
        return Cls;
    }
    if (depth >= 10) {
        throw new Error('IoC: Too many dependencies');
    }
    if (!Array.isArray(Cls.inject)) {
        return new Cls();
    }

    var dependencies = Cls.inject.map(dep => {
        return dependencyInjection(dep, depth+1);
    });
    dependencies.unshift(Cls);

    return new (Cls.bind.apply(Cls, dependencies))();
};

export {dependencyInjection};
