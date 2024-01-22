import {TasksDatasources} from "@/app/api/domain/datasources/tasksDatasources";
import {auth} from "@/auth.config";
import {IFetchPaginationParams} from "@/app/api/domain/entities/pagination";
import {IResponseTasks} from "@/app/api/domain/entities/tasksResponse";
import {handleResponseError} from "@/app/api/infrastructure/errors/handleResponseError";
import {ITaskRequestUpdate} from "@/app/api/domain/entities/taskRequestUpdate";
import {IRequestCreateTask} from "@/app/api/domain/entities/taskRequestCreate";

export class TasksDatasourcesImpl extends TasksDatasources {
    private baseUrl: string = process.env.TASKS_BACKEND_URL || "";

    private async getAccesToken(): Promise<string>  {
        const session = await auth();
        if (!session || !session.user || !session.user.token) {
            throw new Error("No se pudo obtener el token de acceso server side");
        }
        return session.user.token;
    }

    async getListTask({creatorUserId, assigneeUserId, pageSize, pageNumber}: IFetchPaginationParams): Promise<IResponseTasks> {
        try {
            const url = new URL(`${this.baseUrl}/tasks`);

            const params = new URLSearchParams();
            if (creatorUserId) params.append('creatorUserId', creatorUserId);
            if (assigneeUserId) params.append('assigneeUserId', assigneeUserId);
            params.append('pageSize', pageSize.toString());
            params.append('pageNumber', pageNumber.toString());

            url.search = params.toString();

            const urlString = url.href;
            console.log("url string: ", `${urlString}`);

            const token = await this.getAccesToken();
            const response = await fetch(`${urlString}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (response.ok){

                return await response.json();
            }

            console.log("!RESPONSE GET TASK: ", response);
            return handleResponseError(response);
        } catch (error) {
            throw new Error("Se ha producido un error inesperado", (error as Error));
        }
    }

    async removeTask(id: string): Promise<void> {
        try {
            const token = await this.getAccesToken();
            const response = await fetch(`${this.baseUrl}/task/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (response.ok){
                return;
            }
            return handleResponseError(response);
        } catch (error) {
            throw new Error("Se ha producido un error inesperado", (error as Error));
        }
    }

    async createTask(createData: IRequestCreateTask): Promise<void> {
        try {
            console.log(JSON.stringify(createData));
            const token = await this.getAccesToken();
            const response = await fetch(`${this.baseUrl}/task`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(createData),
            });

            console.log("response: ", response);

            if (response.ok){
                return;
            }

            return handleResponseError(response);
        } catch (error) {
            throw new Error("Se ha producido un error inesperado creando la task", (error as Error));
        }
    }

    async updateTask(updateData: ITaskRequestUpdate): Promise<void> {
        try {
            const token = await this.getAccesToken();
            const response = await fetch(`${this.baseUrl}/task`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok){
                return;
            }

            return handleResponseError(response);
        } catch (error) {
            throw new Error("Se ha producido un error inesperado editando la task", (error as Error));
        }
    }
}