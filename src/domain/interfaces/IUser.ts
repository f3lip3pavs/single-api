export interface IUser {
    readonly name : string;
    readonly user_password : string;
    readonly email : string;
    readonly img?: string | null | undefined;
};