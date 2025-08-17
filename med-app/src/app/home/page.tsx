import React from 'react';
import Link from 'next/link';

export default function Home() {
    
    return (
        <>
            <h1>Welcome to the Home Page</h1>

            <div>
                <Link href="/doctor/create">Create Doctor</Link>
            </div>

        </>
    );
};