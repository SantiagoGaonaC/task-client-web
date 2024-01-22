"use server";

import {TasksDatasourcesImpl} from "@/app/api/infrastructure/datasources/tasksDatasourcesImpl";
import {TasksRepositoryImpl} from "@/app/api/infrastructure/repositories/tasksRepositoryImpl";
import {ITaskRequestUpdate} from "@/app/api/domain/entities/taskRequestUpdate";

export const updateTask = async (updateData: ITaskRequestUpdate) => {
    try {
        const taskDatasource = new TasksDatasourcesImpl();
        const taskRepository = new TasksRepositoryImpl(taskDatasource);

        const task = await taskRepository.updateTask(updateData);

        return {
            ok: true,
            task: task,
            message: 'Tarea actualizada'
        }
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'No se pudo actualizar la tarea'
        }
    }
}