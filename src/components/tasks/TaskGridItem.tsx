'use client';

import {ITask} from "@/app/api/domain/entities/tasksResponse";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {formatDate} from "date-fns";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {deleteTask} from "@/actions/tasks/deleteTask";
import {useRouter} from "next/navigation";
import {ITaskRequestUpdate} from "@/app/api/domain/entities/taskRequestUpdate";
import {updateTask} from "@/actions/tasks/updateTask";
import {useToast} from "@/components/ui/use-toast";
import {EventDialog} from "@/components/tasks/DialogCreate";

interface Props {
    task: ITask;
    currentUserId: string;
}

export const TaskGridItem = ( { task, currentUserId }: Props ) => {
    const { toast } = useToast();
    const router = useRouter();


    const handleDelete = async () => {
        // Server Action
        const resp = await deleteTask( task.uuid );

        if ( !resp.ok ) {
            toast({
                title: "Notification!",
                description: "Error deleting task",
                variant: "destructive"
            })
            console.log( resp.message );
            return;
        }

        toast({
            title: "Notification!",
            description: "Task deleted successfully",
        })
        router.refresh();
    }

    const handleMarkAsCompletedOrUpdate = async (updateData: ITaskRequestUpdate) => {
        // Server Action
        const resp = await updateTask(updateData);

        if (!resp.ok) {
            toast({
                title: "Notification!",
                description: "Error updating task",
                variant: "destructive"
            })
            console.log(resp.message);
            return;
        }

        toast({
            title: "Notification!",
            description: "Task updated successfully",
        })
        router.refresh();
    }

    const handleCheckboxClick = () => {
        // Verifica si el usuario actual está asignado a la tarea y la tarea no está completada
        if (isCurrentUserAssigned && !isTaskCompleted) {
            const updateData = {
                uuid: task.uuid,
                isCompleted: "true"
            };

            handleMarkAsCompletedOrUpdate(updateData);
        }
    };

    const isCurrentUserAssigned = task.assigneeUserId === currentUserId;
    const isTaskCompleted = task.isCompleted;

    return (
        <div className="overflow-hidden fade-in bg-white rounded-lg w-96">
            <Card className="mt-4">
                <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold">{task.title}</CardTitle>
                    <Checkbox
                        className="mt-2"
                        onClick={handleCheckboxClick}
                        checked={isTaskCompleted}
                        disabled={!isCurrentUserAssigned || isTaskCompleted}>
                        Mark as completed
                    </Checkbox>
                    {task.creatorUserId === currentUserId && !task.isCompleted && (
                        <EventDialog task={task} isEditMode={true}/>
                    )}
                </CardHeader>
                <CardContent className="p-4">
                    <p className="mb-2"><span className="font-semibold">Created by:</span> {task.userNameCreator}</p>
                    <p className="mb-2"><span className="font-semibold">Assigned to:</span> {task.assigneeName}</p>
                    <p className="mb-2"><span className="font-semibold">Status:</span> {task.isCompleted ?
                        <span className="text-green-500">Completed</span> :
                        <span className="text-yellow-500">In Progress</span>}</p>
                    <p className="mb-2"><span
                        className="font-semibold">Created on:</span> {formatDate(task.createdDate, 'yyyy-MM-dd')}</p>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 rounded-b-lg">
                    {task.creatorUserId === currentUserId && task.isCompleted && (
                        <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" size="sm"
                                variant="destructive" onClick={handleDelete}>Delete Task</Button>
                    )}
                    {task.isCompleted && <p>Completed on: {formatDate(task.completedDate, 'yyyy-MM-dd')}</p>}
                </CardFooter>
            </Card>
        </div>
    );
};