export interface IResponseTasks {
    currentPage: number
    pageSize: number
    totalPages: number
    totalRecords: number
    nextPage: number
    prevPage: any
    items: ITask[]
}

export interface ITask {
    title: string
    creatorUserId: string
    assigneeUserId: string
    isCompleted: boolean
    createdDate: string
    completedDate: string
    uuid: string
    userNameCreator?: string
    assigneeName?: string
}
