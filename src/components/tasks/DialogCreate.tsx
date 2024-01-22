"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {IUser} from "../../../nextauth";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {toast} from "@/components/ui/use-toast";
import {useSession} from "next-auth/react";
import {Input} from "@/components/ui/input";
import {createTask} from "@/actions/tasks/createTask";
import {useEffect, useState} from "react";
import {updateTask} from "@/actions/tasks/updateTask";
import {ITaskRequestUpdate} from "@/app/api/domain/entities/taskRequestUpdate";
import {ITask} from "@/app/api/domain/entities/tasksResponse";
import {getListUsers} from "@/actions/auth/getlistUsers";

const FormSchema = z.object({
    title: z
        .string({
            required_error: "Please enter a title for your task.",
        })
        .min(1, "Please enter a title for your task."),
    assigneeUserId: z
            .string({
                required_error: "Please select an assignee for your task.",
            })
            .min(1, "Please select an assignee for your task."),
})

interface Props {
    task?: ITask;
    isEditMode?: boolean;
}

export function EventDialog({ task, isEditMode = false }: Props) {
    const { data } = useSession();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: task?.title ?? "",
            assigneeUserId: task?.assigneeUserId ?? (data?.user?.uuid ?? ""),
        }
    })

    useEffect(() => {
        const fetchUsers = async () => {
            const { users } = await getListUsers();
            setUsers(users);
        }

        fetchUsers();
    }, []);


    const onSubmit = async (data: z.infer<typeof FormSchema>) => {

        if (isEditMode) {
            const updateData: ITaskRequestUpdate = {
                uuid: task?.uuid ?? "",
                title: data.title,
                assigneeUserId: data.assigneeUserId,
            }

            const resp = await updateTask(updateData);

            if (!resp.ok) {
                toast({
                    title: "Notification!",
                    description: "Error updating task",
                    variant: "destructive",
                })
                return;
            }

            toast({
                title: "Notification!",
                description: "Task updated successfully",
            })
            setIsEditDialogOpen(false);

        } else {
            //server action
            const resp = await createTask(data);

            if ( !resp.ok ) {
                toast({
                    title: "Notification!",
                    description: "Error creating task",
                    variant: "destructive",
                })
                return;
            }

            toast({
                title: "Notification!",
                description: "Task created successfully",
            })
            setIsEditDialogOpen(false);
        }
    }

    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
                    <Button variant="outline">{isEditMode ? "Edit Task" : "Create Task"}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? "Edit Task" : "Create Task"}</DialogTitle>
                        <DialogDescription>
                            {isEditMode ? "Edit" : "Create"} a new task by filling out the form below.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Question title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="assigneeUserId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assignee</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a user" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {users.map((user) => (
                                                    <SelectItem key={user.uuid} value={user.uuid}>
                                                        {user.email}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">Save taks</Button>
                            </DialogFooter>
                        </form>
                    </Form>

                </DialogContent>
        </Dialog>
)
}
