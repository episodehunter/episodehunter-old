declare module db {
    declare function getUser(id: number) : void;
}

// type database = {
//     query(query: string) : Promise;
// }

declare class Database {
    query(query: string) : Promise;
}
