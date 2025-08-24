import React from 'react';
import Link from 'next/link';

export default function Home() {

    return (
        <>
            <h1>Welcome to the Home Page</h1>

            <br />

            <div>
                <Link href="/doctor/create">Create New Doctor</Link>

                <br />

                <Link href="/doctor/list">List All Doctors</Link>

                <br />

                <Link href="/pacient/create">Create New Pacient</Link>

                <br />

                <Link href="/appointment/create">Create New Appointment</Link>

                <br />

                <Link href="/prescription/create">Create New Prescription</Link>

            </div>

        </>
    );
};