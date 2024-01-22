import {getPaginationTasks} from "@/actions/tasks/tasks-pagination";
import {redirect} from "next/navigation";
import {MyPagination} from "@/components/pagination/MyPagination";
import {TaskGrid} from "@/components/tasks/TaskGrid";
import {EventDialog} from "@/components/tasks/DialogCreate";
import {Suspense} from "react";
import {auth} from "@/auth.config";

interface Props {
    searchParams: {
        creatorUserId?: string;
        assigneeUserId?: string;
        page?: string;
        pageSize?: string;

    }
}

export default async function Tasks({ searchParams }: Props) {
    const session = await auth();
    const pageNumber = searchParams.page ? parseInt( searchParams.page ) : 1;
    const pageSize = searchParams.pageSize ? parseInt( searchParams.pageSize ) : 10;
    const creatorUserId = searchParams.creatorUserId ? searchParams.creatorUserId : undefined;
    const assigneeUserId = searchParams.assigneeUserId ? searchParams.assigneeUserId : undefined;
    const { tasks, totalPages, currentPage } = await getPaginationTasks({creatorUserId, assigneeUserId, pageSize, pageNumber});

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Task Management</h1>
            <EventDialog/>
            <Suspense fallback={null}>
                <TaskGrid tasks={tasks} currentUserId={session?.user?.uuid || ''}/>
            </Suspense>
            <MyPagination totalPages={totalPages}/>
        </div>
    );
}
