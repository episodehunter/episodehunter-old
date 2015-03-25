'use strict';

var authController = require('./auth_controller');
var controller = new authController();

module.exports = (function() {
    return [
        {
            method: 'GET',
            path: '/auth/{userid}',
            config : {
                handler: controller.login,
                auth: false
            }
        }
    ];
}());
