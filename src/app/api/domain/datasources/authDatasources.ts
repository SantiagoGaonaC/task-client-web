import {IUserLoginResponse, IUserResponse} from "@/app/api/domain/entities/authResponse";

export abstract class AuthDatasources {
    abstract registerUser(name: string, email: string, password: string): Promise<IUserResponse>;
    abstract loginUser(authData: { email: string, password: string }): Promise<IUserLoginResponse>;
    abstract getListUsers(): Promise<IUserResponse[]>;
}
