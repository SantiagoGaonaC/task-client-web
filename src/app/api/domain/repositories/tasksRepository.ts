import {IFetchPaginationParams} from "@/app/api/domain/entities/pagination";
import {IResponseTasks} from "@/app/api/domain/entities/tasksResponse";
import {ITaskRequestUpdate} from "@/app/api/domain/entities/taskRequestUpdate";
import {IRequestCreateTask} from "@/app/api/domain/entities/taskRequestCreate";

export abstract class TasksRepository {
    abstract getListTask({creatorUserId, assigneeUserId, pageSize, pageNumber}: IFetchPaginationParams): Promise<IResponseTasks>;
    abstract removeTask(id: string): Promise<void>;
    abstract createTask(createData: IRequestCreateTask): Promise<void>;
    abstract updateTask(updateData: ITaskRequestUpdate): Promise<void>;
}