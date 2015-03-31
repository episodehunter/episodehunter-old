/* @flow */
'use strict';

console.log('Connection to db..');

var validUsers = [
    {
        id: 1,
        username: 'tjoskar'
    }
];

function query() : Promise {
    console.log('Geting data');
    return new Promise(resolve => {
        setTimeout(_ => resolve({
            'id': 5,
            'title': 'Best film ever'
        }), 0);
    });
}

function getUser(id: number) : Promise {
    return new Promise((resolve, reject) => {
        validUsers.some(user => {
            if (user.id === id) {
                resolve(user);
                return true;
            }
        });
        reject('No user found :(');
    });
}

module.exports = {
    query: query,
    getUser: getUser
};
