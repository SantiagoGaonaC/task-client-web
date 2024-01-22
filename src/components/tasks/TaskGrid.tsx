import {TaskGridItem} from "@/components/tasks/TaskGridItem";
import {ITask} from "@/app/api/domain/entities/tasksResponse";

interface Props {
    tasks: ITask[];
    currentUserId: string;
}

export const TaskGrid = ( { tasks, currentUserId }: Props ) => {
    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-3 gap-8">
            {
                tasks.map( task => (
                    <TaskGridItem
                        key={ task.uuid }
                        task={ task }
                        currentUserId={currentUserId}
                    />
                ) )
            }
        </div>
    );
};