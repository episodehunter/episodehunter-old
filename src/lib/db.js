console.log('Connection to db..');

var validUsers = [
    {
        id: 1,
        username: 'tjoskar'
    }
];

module.exports = {
    query: () => {
        console.log('Geting data');
        return new Promise(resolve => {
            setTimeout(_ => resolve({
                'id': 5,
                'title': 'Best film ever'
            }), 0);
        });
    },

    getUser: (id) => {
        'use strict';
        id = (id|0);
        return new Promise((resolve, reject) => {
            validUsers.some(user => {
                if (user.id === id) {
                    resolve(user);
                    return true;
                }
            });
            reject();
        });
    }
};
