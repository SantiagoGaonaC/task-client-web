"use server";

import {TasksDatasourcesImpl} from "@/app/api/infrastructure/datasources/tasksDatasourcesImpl";
import {TasksRepositoryImpl} from "@/app/api/infrastructure/repositories/tasksRepositoryImpl";
import {IRequestCreateTask} from "@/app/api/domain/entities/taskRequestCreate";

export const createTask = async (createData: IRequestCreateTask) => {
    try {
        const taskDatasource = new TasksDatasourcesImpl();
        const taskRepository = new TasksRepositoryImpl(taskDatasource);

        const task = await taskRepository.createTask(createData);

        return {
            ok: true,
            task: task,
            message: 'Tarea creada'
        }
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'No se pudo crear la tarea'
        }
    }
}