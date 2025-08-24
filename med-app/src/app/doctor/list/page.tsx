"use client"
import React, { useEffect, useState } from 'react'; // HOOK = gancho
import Link from 'next/link';

export default function DoctorList() {
    const [doctors, setDoctors] = useState(new Array());
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/doctors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
            .then(data => setDoctors(data))
    }, [doctors]);

    const deleteDoctor = async (id: any) => {
        const add = await fetch(`http://127.0.0.1:3001/doctors/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        });
        const content = await add.json();
        console.log(content);
        if (content.login) {
            window.location.reload();
        } else {
            setError(content.error);
        }
    }

    return (
        <>
            {/* Botão Voltar */}
            <div className="w-full flex justify-end mt-6 pr-6">
                <Link
                    href="/home"
                    className="w-32 p-3 text-white rounded-md bg-blue-500 hover:bg-blue-600 transition cursor-pointer text-center"
                >
                    Voltar
                </Link>
            </div>

            <h1 className="text-4xl font-bold text-black mb-8 text-center">List of Doctors</h1>

            {/* Tabela de médicos */}
            <div className="overflow-x-auto mt-6 px-6">
                <table className="min-w-full border-collapse border border-slate-300 text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-slate-300 px-4 py-2 text-left">Nome</th>
                            <th className="border border-slate-300 px-4 py-2 text-center">Login</th>
                            <th className="border border-slate-300 px-4 py-2 text-center">Especialidade Médica</th>
                            <th className="border border-slate-300 px-4 py-2 text-center">Registro Médico</th>
                            <th className="border border-slate-300 px-4 py-2 text-center">Email</th>
                            <th className="border border-slate-300 px-4 py-2 text-center">Telefone</th>
                            <th className="border border-slate-300 px-4 py-2 text-center">Ações</th>
                        </tr>
                    </thead>

                    <tbody className="doctors" id="doctors">
                        {!!doctors && doctors.map((doctor: any) => (
                            <tr
                                key={doctor._id}
                            >
                                <td className="border border-slate-300 px-4 py-2">{doctor.name}</td>
                                <td className="border border-slate-300 px-4 py-2 text-center">{doctor.login}</td>
                                <td className="border border-slate-300 px-4 py-2 text-center">{doctor.medicalSpecialty}</td>
                                <td className="border border-slate-300 px-4 py-2 text-center">{doctor.medicalRegistration}</td>
                                <td className="border border-slate-300 px-4 py-2 text-center">{doctor.email}</td>
                                <td className="border border-slate-300 px-4 py-2 text-center">{doctor.phone}</td>
                                <td className="border border-slate-300 px-4 py-2 text-center space-x-2">
                                    <button
                                        onClick={() => deleteDoctor(doctor._id)}
                                        className="bg-red-500 p-2 rounded-md text-white text-sm hover:bg-red-600 transition cursor-pointer"
                                    >
                                        Delete
                                    </button>

                                    <Link
                                        href={`/doctor/edit/${doctor._id}`}
                                        className="bg-yellow-500 p-2 rounded-md text-white text-sm hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mensagem de erro */}
            {error && (
                <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400 mt-4 text-center">
                    {error}
                </div>
            )}
        </>

    )
}