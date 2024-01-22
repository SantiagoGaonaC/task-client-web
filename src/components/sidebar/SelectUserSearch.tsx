"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getListUsers } from "@/actions/auth/getlistUsers";
import { IUser } from "../../../nextauth";
import {useRouter, useSearchParams} from "next/navigation";

export function SelectUserSearch() {
    const searchParams = useSearchParams();
    const [users, setUsers] = useState<IUser[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            const { users } = await getListUsers();
            setUsers(users);
        }
        fetchUsers();
    }, []);

    const handleSelectUser = (value: string) => {
        const userId = value;
        const params = new URLSearchParams(searchParams);
        params.set('creatorUserId', userId);
        router.replace(`${window.location.pathname}?${params.toString()}`);
    };

    const defaultValue = searchParams.get('userId')?.toString() || '';

    return (
        <Select onValueChange={(value) => handleSelectUser(value)} defaultValue={defaultValue}>
            <SelectTrigger className="">
                <SelectValue placeholder="Search users..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Users</SelectLabel>
                    {users.map((user) => (
                        <SelectItem key={user.uuid} value={user.uuid}>
                            {user.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
