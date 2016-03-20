declare module 'hapi-auth-jwt2' {
    export default function hej();
}

declare module bcrypt {
    export function hash(str: string, callback: Function);
    export function compare(str1: string, str2: string, callback: (result: boolean) => void)
}

declare module 'twin-bcrypt' {
    export default bcrypt;
}

declare module 'jsonwebtoken' {
    export function sign(data: Object, salt: string): Promise<string>;
}
