"use server";

import { TasksDatasourcesImpl } from "@/app/api/infrastructure/datasources/tasksDatasourcesImpl";
import { TasksRepositoryImpl } from "@/app/api/infrastructure/repositories/tasksRepositoryImpl";

export const deleteTask = async (id: string) => {
    try {
        const taskDatasource = new TasksDatasourcesImpl();
        const taskRepository = new TasksRepositoryImpl(taskDatasource);

        const task = await taskRepository.removeTask(id);

        return {
            ok: true,
            task: task,
            message: 'Tarea eliminada'
        }
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'No se pudo eliminar la tarea'
        }
    }
}