"use client";

import { useEffect } from 'react';
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import {IoAlertCircleOutline, IoInformationOutline} from "react-icons/io5";
import clsx from 'clsx';
import {authenticate} from "@/actions/auth/login";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, undefined);

    console.log(state);

    useEffect(() => {
        if ( state === 'Success' ) {
            // redireccionar
            // router.replace('/');
            window.location.replace('/tasks');
        }

    },[state]);


    return (
        <form action={dispatch} className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name="email"
            />

            <Label htmlFor="email">Password</Label>
            <Input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name="password"
            />

            <div
                className="flex items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {state === "CredentialsSignin" && (
                    <div className="flex flex-row mb-2">
                        <Alert variant="destructive">
                            <IoAlertCircleOutline className="h-5 w-5" />
                            <AlertTitle className="text-sm">Error</AlertTitle>
                            <AlertDescription>
                                Credentials are invalid
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>

            <LoginButton />
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href="/auth/register" className="btn-secondary text-center">
                Create an account
            </Link>
        </form>
    );
};

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className={ clsx({
                "btn-primary": !pending,
                "btn-disabled": pending
            })}
            disabled={ pending }
        >
            Sign In
        </Button>
    );
}