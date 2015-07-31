import {autoInject} from 'autoinject';
import {db as Database} from '../../lib/db';
import {User} from '../../model/user';

@autoInject
class UserRepository {
    public db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    getUser(username: string, password: string) {
        return this.db.q
            .select(
                this.db.model.userModel.id,
                this.db.model.userModel.username
            )
            .from(this.db.model.userModel.$table)
            .where(
                this.db.model.userModel.username, '=', username
            )
            .where(
                this.db.model.userModel.password, '=', password
            )
            .then(user => {
                return new User(user);
            });
    }

}

export {UserRepository};
