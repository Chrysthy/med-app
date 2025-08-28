"use client"
import React, { useEffect, useState } from 'react'; // HOOK = gancho
import Link from 'next/link';

export default function AppointmentList() {
    const [appointments, setAppointments] = useState(new Array());
    const [error, setError] = useState<string | null>(null);
    const [doctors, setDoctors] = useState(new Array());
    const [pacients, setPacients] = useState(new Array());

    useEffect(() => {
        fetch('http://127.0.0.1:3001/appointments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
            .then(data => {
                setAppointments(data);
            });
    }, [appointments]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/doctors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
            .then(data => {
                setDoctors(data);
            });
    }, [doctors]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/pacients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
            .then(data => {
                setPacients(data);
            });
    }, [pacients]);


    const deleteAppointment = async (id: any) => {
        const add = await fetch(`http://127.0.0.1:3001/appointments/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        });
        const content = await add.json();

        if (content.date) {
            window.location.reload();
        } else {
            setError(content.error);
        }
    }

    const findDoctorName = (id: any) => {
        let name;

        doctors.map((doctor) => {
            if (doctor._id == id) {
                name = doctor.name;
            }
        });

        return name;
    }

    const findPacientName = (id: any) => {
        let name;

        pacients.map((pacient) => {
            if (pacient._id == id) {
                name = pacient.name;
            }
        });

        return name;
    }

    return (
        <>
            <div className="w-full flex justify-end mt-6 pr-6">
                <Link
                    href="/home"
                    className="w-32 p-3 text-white rounded-md bg-blue-500 hover:bg-blue-600 transition cursor-pointer text-center"
                >
                    Voltar
                </Link>
            </div>

            <div className="mt-6 px-6 border-gray-300 rounded-md overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th scope="col" className="p-2 border border-gray-300">Date</th>
                            <th scope="col" className="p-2 border border-gray-300 text-center">Doctor</th>
                            <th scope="col" className="p-2 border border-gray-300 text-center">Pacient</th>
                            <th scope="col" className="p-2 border border-gray-300 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!!appointments && appointments.map((appointment: any) => (
                            <tr key={appointment._id}>
                                <td className="p-2 border border-gray-300">{appointment.date}</td>
                                <td className="p-2 border border-gray-300 text-center">{findDoctorName(appointment.doctorId)}</td>
                                <td className="p-2 border border-gray-300 text-center">{findPacientName(appointment.pacientId)}</td>
                                <td className="p-2 border border-gray-300 text-center">
                                    <button
                                        onClick={() => deleteAppointment(appointment._id)}
                                        className="bg-red-500 px-3 py-1 rounded text-white text-sm"
                                    >
                                        Delete
                                    </button>

                                    <Link
                                        href={`/appointment/edit/${appointment._id}`}
                                        className="bg-yellow-500 px-3 py-1 ml-2 rounded text-white text-sm"
                                    >
                                        Edit
                                    </Link>

                                    <Link
                                        href={`/prescription/${appointment._id}/create`}
                                        className="bg-green-500 px-3 py-1 ml-2 rounded text-white text-sm"
                                    >
                                        Create new prescription
                                    </Link>

                                    <Link
                                        href="/prescription/upload"
                                        className="bg-green-500 px-3 py-1 ml-2 rounded text-white text-sm"
                                    >
                                        Upload prescription
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {error && (
                <div className="p-2 mt-2 rounded bg-red-400 text-white border border-gray-200">
                    {error}
                </div>
            )}


        </>
    )
}