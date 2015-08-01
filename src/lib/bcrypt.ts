import * as Promise from 'bluebird';
const bcrypt = require('twin-bcrypt');
import {UserSelectionInterface} from '../sections/auth/auth-repository';

function hash(data: string): Promise<string> {
    return new Promise<string>(resolve => {
        bcrypt.hash(data, resolve);
    });
}

function compare(password: string, refhash: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.hash(password, refhash, b => {
            if (b) {
                resolve(Promise.resolve(true));
            } else {
                reject(false);
            }
        });
    });
}

function compareUserPassword(user: UserSelectionInterface, password: string): Promise<UserSelectionInterface> {
    return new Promise<UserSelectionInterface>((resolve, reject) => {
        bcrypt.compare(password, user.password, match => {
            if (match === true) {
                resolve(Promise.resolve(user));
            } else {
                reject(`password don't match`);
            }
        });
    });
}

export {hash, compare, compareUserPassword};
