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
        return <any>database.q
            .first(...this.selections)
            .from(database.model.userModel.$table)
            .where(
                database.model.userModel.id, '=', id
            );
    }

    getUserByUsername(username: string): Promise<UserSelectionInterface> {
        return <any>database.q
            .first(...this.selections)
            .from(database.model.userModel.$table)
            .where(
                database.model.userModel.username, '=', username
            );
    }

}

export {UserRepository, UserSelectionInterface};
