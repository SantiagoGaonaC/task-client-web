import {TasksRepository} from "@/app/api/domain/repositories/tasksRepository";
import {TasksDatasources} from "@/app/api/domain/datasources/tasksDatasources";
import {IFetchPaginationParams} from "@/app/api/domain/entities/pagination";
import {IResponseTasks} from "@/app/api/domain/entities/tasksResponse";
import {ITaskRequestUpdate} from "@/app/api/domain/entities/taskRequestUpdate";
import {IRequestCreateTask} from "@/app/api/domain/entities/taskRequestCreate";

export class TasksRepositoryImpl extends TasksRepository {
    private dataSource : TasksDatasources;

    constructor(dataSource : TasksDatasources) {
        super();
        this.dataSource = dataSource;
    }

    async getListTask({creatorUserId, assigneeUserId, pageSize, pageNumber}: IFetchPaginationParams): Promise<IResponseTasks> {
        return this.dataSource.getListTask({creatorUserId, assigneeUserId, pageSize, pageNumber});
    }

    async removeTask(id: string): Promise<void> {
        return this.dataSource.removeTask(id);
    }

    async createTask(createData: IRequestCreateTask): Promise<void> {
        return this.dataSource.createTask(createData);
    }

    async updateTask(updateData: ITaskRequestUpdate): Promise<void> {
        return this.dataSource.updateTask(updateData);
    }
}
