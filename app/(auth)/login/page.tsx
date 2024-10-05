"use client";
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Dog, Loader2, TriangleAlert } from "lucide-react";
import { signIn, useSession } from 'next-auth/react';
import { getLoginErrorMessage } from '@/lib/functions';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


export default function Login() {
    const router = useRouter();

    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [status, router]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true)
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/dashboard',
        });

        setIsLoading(false)

        if (result?.ok) {
            setIsError(false)
            setIsSuccess(true)
            setSuccess("You have logged in successfully.")
            router.push("/dashboard");
        } else {
            const error = result?.error
            setError(getLoginErrorMessage(error));
            setIsSuccess(false)
            setIsError(true)

        }
    }

    if (status === "loading") {
        return (<div className='w-full h-screen flex justify-center items-center'><Loader2 className="text-primary mx-auto h-36 w-36 animate-spin" /></div>);
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2"><Dog />Scribe App</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">
                        {(isError || isSuccess) && 
                        <Alert variant={isError ? "destructive": "default"}>
                            {isError ? <TriangleAlert className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            <AlertTitle>{isError ? "Uh oh! Something went wrong." : "Welcome"}</AlertTitle>
                            <AlertDescription>
                                {isError ? error : success}
                            </AlertDescription>
                        </Alert>}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type='submit' className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Sign in
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
