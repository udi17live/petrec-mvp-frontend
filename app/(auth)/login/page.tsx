"use client"
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dog } from "lucide-react"

export default function Login() {
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        // const formData = new FormData(event.currentTarget)
        // const email = formData.get('email')
        // const password = formData.get('password')

        // const response = await fetch('/api/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password }),
        // })
        router.push('/dashboard');
        // if (response.ok) {
        //     router.push('/dashboard')
        // } else {
        //     // Handle errors
        // }
    }

    return (
        <div className="w-full h-screen flex justfy-center items-center">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2"><Dog />Scribe App</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">

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
                        <Button type='submit' className="w-full">Sign in</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}