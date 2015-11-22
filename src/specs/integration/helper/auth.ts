let headers = {
    // Using `password` as password
    Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJqb2huX3Nub3ciLCJpYXQiOjE0NDAzNDEwMjd9.hnTLPEzYSr52u9EavUDVHn_RZOw7-OMjtjAoJPt5WPE'
};

let loginIfTrying = query => {
    if (query.sql === 'select `users`.`id`, `users`.`username`, `users`.`password` from `users` where `users`.`id` = ? limit ?') {
        query.response({
            username: 'john_snow',
            password: 'password'
        });
        return true;
    }
    return false;
};

export {headers, loginIfTrying};
