import { server } from '../../server';
import { IDictionary } from 'hapi';

interface ServerResponse<T> {
    statusCode: number;
    headers: IDictionary<string>;
    result: T;
}

export const request = {
    get<T>(url: string): Promise<ServerResponse<T>> {
        return <any> server.inject({
            method: 'GET',
            url,
            headers: {
                Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJqb2huX3Nub3ciLCJwYXNzd29yZCI6IiQyeSQxMCRxYkUwQVNvQU8xNFV2cUpIcG9BN3dlblRmT1UuRlZvL0ljTk9CbHhYOGpFbDYuR1ZkVk0wTyIsImlhdCI6MTQ2NzQ2NzI5NH0.dJCDXShd6TrvNmKeGAfglBFCMBxIsEa7iqdrlHMujGo'
            }
        });
    }
};
