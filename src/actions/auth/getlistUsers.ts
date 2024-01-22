'use server';

import {AuthDatasourcesImpl} from "@/app/api/infrastructure/datasources/authDatasourcesImpl";
import {AuthRepositoryImpl} from "@/app/api/infrastructure/repositories/authRepositoryImpl";

export const getListUsers = async () => {
    try {

        const authDataSource = new AuthDatasourcesImpl();
        const authRepository = new AuthRepositoryImpl(authDataSource);
        const users = await authRepository.getListUsers();

        return {
            users: users.map((user) => ({
                ...user,
            })),
        };

    } catch (error) {
        console.error("Error loading tasks:", error);
        throw new Error("No se pudo cargar las tareas: " + (error as Error));
    }
}