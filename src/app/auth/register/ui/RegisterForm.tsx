"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import {registerUser} from "@/actions/auth/register";
import {login} from "@/actions/auth/login";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async(data) => {
        setErrorMessage('');
        const { name, email, password } = data;

        // Server action
        const resp = await registerUser( name, email, password );

        if ( !resp.ok ) {
            setErrorMessage( resp.message );
            return;
        }

        await login( email.toLowerCase(), password );
        window.location.replace('/tasks');
    }


    return (
        <form onSubmit={ handleSubmit( onSubmit ) }  className="flex flex-col gap-1.5">
            <Label htmlFor="email">Name</Label>
            <Input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                { ...register('name', { required: true }) }
            />

            <Label htmlFor="email">Email</Label>
            <Input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                { ...register('email', { required: true, pattern: /^\S+@\S+$/i }) }
            />

            <Label htmlFor="email">Password</Label>
            <Input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                type="password"
                { ...register('password', { required: true, minLength: 6 }) }
            />


            <span className="text-red-500">{ errorMessage } </span>

            <Button className="btn-primary">Create account</Button>

            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href="/auth/login" className="btn-secondary text-center">
                Sign In
            </Link>
        </form>
    );
};
