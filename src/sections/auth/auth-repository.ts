import {autoInject} from 'autoinject';
import {database} from '../../lib/db';

interface UserSelectionInterface {
    id: number;
    username: string;
    password: string;
};

@autoInject
class UserRepository {
    selections: Array<string>;

    constructor() {
        this.selections = [
            database.model.userModel.id,
            database.model.userModel.username,
            database.model.userModel.password
        ];
    }

    getUserById(id: number): Promise<UserSelectionInterface> {
        return database.q
            .first(...this.selections)
            .from(database.model.userModel.$table)
            .where(
                database.model.userModel.id, '=', id
            ).then(user => {
                if (user === undefined) {
                    return Promise.reject(undefined);
                }
                return user;
            });
    }

    getUserByUsername(username: string): Promise<UserSelectionInterface> {
        return database.q
            .first(...this.selections)
            .from(database.model.userModel.$table)
            .where(
                database.model.userModel.username, '=', username
            ).then(user => {
                if (user === undefined) {
                    return Promise.reject(undefined);
                }
                return user;
            });
    }

}

export {UserRepository, UserSelectionInterface};
