"use client";
import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button"; 

interface SignOutButtonProps {
    children: React.ReactNode; // Only accepts children
}

export default function SignOutButton({children}: SignOutButtonProps) {
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    return (
        <div onClick={handleSignOut}>
            {children}
        </div>
    );
}
