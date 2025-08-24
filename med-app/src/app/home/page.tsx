import React from 'react';
import Link from 'next/link';

export default function Home() {

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 p-6">

            {/* Conteúdo principal centralizado */}
            <div className="flex flex-col items-center w-full max-w-md mx-auto mt-16">
                <h1 className="text-4xl font-bold text-black mb-8 text-center">Welcome, Doctor!</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <Link href="/doctor/create" className="block text-center p-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition cursor-pointer">
                        Create New Doctor
                    </Link>

                    <Link href="/doctor/list" className="block text-center p-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition cursor-pointer">
                        List All Doctors
                    </Link>

                    <Link href="/pacient/create" className="block text-center p-4 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600 transition cursor-pointer">
                        Create New Pacient
                    </Link>

                    <Link href="/pacient/list" className="block text-center p-4 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600 transition cursor-pointer">
                        List All Pacients
                    </Link>

                    <Link href="/appointment/create" className="block text-center p-4 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition cursor-pointer">
                        Create New Appointment
                    </Link>

                    <Link href="/appointment/list" className="block text-center p-4 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition cursor-pointer">
                        List All Appointments
                    </Link>

                    <Link href="/prescription/create" className="block text-center p-4 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600 transition col-span-2 justify-self-center cursor-pointer">
                        Create New Prescription
                    </Link>
                </div>
            </div>

            {/* Logout centralizado na parte inferior */}
            <div className="flex justify-center mt-auto mb-8 w-full">
                <Link href="/" className="block text-center p-4 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition cursor-pointer w-full max-w-md">
                    Logout
                </Link>
            </div>

        </div>


    );
};