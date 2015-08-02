import {autoInject} from 'autoinject';
import {db as Database} from '../../lib/db';

interface UserSelectionInterface {
    id: number;
    username: string;
    password: string;
};

@autoInject
class UserRepository {
    db: Database;
    selections: Array<string>;

    constructor(db: Database) {
        this.db = db;
        this.selections = [
            this.db.model.userModel.id,
            this.db.model.userModel.username,
            this.db.model.userModel.password
        ];
    }

    getUserById(id: number) : Promise<UserSelectionInterface> {
        return this.db.q
            .select(this.selections)
            .from(this.db.model.userModel.$table)
            .where(
                this.db.model.userModel.id, '=', id
            ).then(user => {
                if (user === undefined) {
                    return Promise.reject(undefined)
                }
                return user;
            });
    }

    getUserByUsername(username: string) : Promise<UserSelectionInterface> {
        return this.db.q
            .first(...this.selections)
            .from(this.db.model.userModel.$table)
            .where(
                this.db.model.userModel.username, '=', username
            ).then(user => {
                if (user === undefined) {
                    return Promise.reject(undefined)
                }
                return user;
            });
    }

}

export {UserRepository, UserSelectionInterface};
