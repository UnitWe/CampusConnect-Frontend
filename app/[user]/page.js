'use client'
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Page({ params }) {
    const pathname = usePathname()
    const encodedPath = pathname.replace('%20', ' ');
    const parts = encodedPath.substring(1).split('/');
    const user = parts[0];
    const title = parts[1];

    return (
        <div>
            <h1>Usuário: {user}</h1>
        </div>
    )
}