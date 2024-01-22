import {AuthDatasources} from "@/app/api/domain/datasources/authDatasources";
import {auth} from "@/auth.config";
import {IUserLoginResponse, IUserResponse} from "@/app/api/domain/entities/authResponse";
import {handleResponseError} from "@/app/api/infrastructure/errors/handleResponseError";

export class AuthDatasourcesImpl extends AuthDatasources {
    private baseUrl: string = process.env.AUTH_BACKEND_URL || "";

    private async getAccesToken(): Promise<string>  {
        const session = await auth();
        if (!session || !session.user || !session.user.token) {
            throw new Error("No se pudo obtener el token de acceso server side");
        }
        return session.user.token;
    }

    async registerUser(name: string, email: string, password: string): Promise<IUserResponse> {
        try {

            const response = await fetch(`${this.baseUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (response.ok){
                return await response.json();
            }

            return handleResponseError(response);
        } catch (error) {
            throw new Error("Se ha producido un error inesperado", (error as Error));
        }
    }

    async loginUser(authData: { email: string, password: string }): Promise<IUserLoginResponse> {
        try {

            const response = await fetch(`${this.baseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(authData),
            });

            if (response.ok){
                return await response.json();
            }

            return handleResponseError(response);
        } catch (error) {
            throw new Error("Se ha producido un error inesperado", (error as Error));
        }
    }

    //TODO: send token
    async getListUsers(): Promise<IUserResponse[]> {

        try {
            const response = await fetch(`${this.baseUrl}/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok){
                return await response.json();
            }

            return handleResponseError(response);
        } catch (error) {
            throw new Error("Se ha producido un error inesperado", (error as Error));
        }
    }
}