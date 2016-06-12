const bcrypt = require('twin-bcrypt');
import { UserSelectionInterface } from '../sections/auth/auth-repository';

function hash(data: string): Promise<string> {
    return new Promise<string>(resolve => {
        bcrypt.hash(data, resolve);
    });
}

function compareUserPassword(user: UserSelectionInterface, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password, user.password, match => {
            resolve(match === true);
        });
    });
}

export { hash, compareUserPassword };
