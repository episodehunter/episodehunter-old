'use strict';

const transformer = {

    transform: function(mapper, obj) {
        return obj.map(function(el) {
            return {
                ids: {
                    'series_id': el.series_id
                }
            };
        });
    }

};


var obj2 = [{
    'series_id': 6
}];

var k = transformer.transform({
    ids: {
        'series_id': 'series_id'
    }
}, obj2);

console.log(k);
