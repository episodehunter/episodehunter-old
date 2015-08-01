import {autoInject} from 'autoinject';
import {db as Database} from '../../lib/db';
import {User} from '../../model/user';
import {hash} from '../../lib/bcrypt';

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

    getUserById(id: number) {
        return this.db.q
            .select(this.selections)
            .from(this.db.model.userModel.$table)
            .where(
                this.db.model.userModel.id, '=', id
            );
    }

    getUserByUsername(username: string) : Promise<UserSelectionInterface> {
        return this.db.q
            .first(...this.selections)
            .from(this.db.model.userModel.$table)
            .where(
                this.db.model.userModel.username, '=', username
            );
    }

}

export {UserRepository, UserSelectionInterface};
