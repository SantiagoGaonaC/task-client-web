'use server';

import {AuthDatasourcesImpl} from "@/app/api/infrastructure/datasources/authDatasourcesImpl";
import {AuthRepositoryImpl} from "@/app/api/infrastructure/repositories/authRepositoryImpl";

export const registerUser = async(name: string, email: string, password: string ) => {
    try {
        const authDatasource = new AuthDatasourcesImpl();
        const authRepository = new AuthRepositoryImpl(authDatasource);

        const user = await authRepository.registerUser(name, email, password);
        return {
            ok: true,
            user: user,
            message: 'Usuario creado'
        }

    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }
}