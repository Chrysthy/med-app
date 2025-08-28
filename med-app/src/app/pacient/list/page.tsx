"use client"
import React, { useEffect, useState } from 'react'; // HOOK = gancho
import Link from 'next/link';

export default function PacientList() {
    const [pacients, setPacients] = useState(new Array());
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/pacients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
            .then(data => setPacients(data))
    }, [pacients]);

    const deletePacient = async (id: any) => {
        const add = await fetch(`http://127.0.0.1:3001/pacients/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        });
        const content = await add.json();

        if (content.login) {
            window.location.reload();
        } else {
            setError(content.error);
        }
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

            <div className="overflow-x-auto mt-6 px-6">
                <table className="w-full border-collapse border border-slate-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-slate-300 px-4 py-2 text-left">Nome</th>
                            <th className="border border-slate-300 px-4 py-2 text-center">Nascimento</th>
                            <th className="border border-slate-300 px-4 py-2 text-center">Email</th>
                            <th className="border border-slate-300 px-4 py-2 text-center">Telefone</th>
                            <th className="border border-slate-300 px-4 py-2 text-center">Ações</th>
                        </tr>
                    </thead>

                    <tbody id="pacients" className="pacients">
                        {!!pacients && pacients.map((pacient: any) => (
                            <tr key={pacient._id} className="hover:bg-gray-50">
                                <td className="border border-slate-300 px-4 py-2">{pacient.name}</td>
                                <td className="border border-slate-300 px-4 py-2 text-center">{pacient.birthDate}</td>
                                <td className="border border-slate-300 px-4 py-2 text-center">{pacient.email}</td>
                                <td className="border border-slate-300 px-4 py-2 text-center">{pacient.phone}</td>
                                <td className="border border-slate-300 px-4 py-2 text-center space-x-2">
                                    <button
                                        onClick={() => deletePacient(pacient._id)}
                                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        href={`/pacient/edit/${pacient._id}`}
                                        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white text-sm"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {error && (
                <div className="mt-3 p-2 text-sm text-white rounded bg-red-500">
                    {error}
                </div>
            )}

        </>
    )
}