import {AuthRepository} from "@/app/api/domain/repositories/authRepository";
import {AuthDatasources} from "@/app/api/domain/datasources/authDatasources";
import {IUserLoginResponse, IUserResponse} from "@/app/api/domain/entities/authResponse";

export class AuthRepositoryImpl extends AuthRepository {
    private dataSource : AuthDatasources;
    constructor(dataSource : AuthDatasources) {
        super();
        this.dataSource = dataSource;
    }
    async registerUser(name: string, email: string, password: string): Promise<IUserResponse> {
        return this.dataSource.registerUser(name, email, password);
    }

    async loginUser(authData: { email: string, password: string }): Promise<IUserLoginResponse> {
        return this.dataSource.loginUser(authData);
    }

    async getListUsers(): Promise<IUserResponse[]> {
        return this.dataSource.getListUsers();
    }
}