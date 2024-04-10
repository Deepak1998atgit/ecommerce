export interface userRegisterInterface {
    firstName: string;
    lastName?: string;
    email: string;
    mobile: string;
    password: string;
}

export interface userLoginInterface {
    email: string;
    password: string;
}