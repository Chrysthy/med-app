"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function PrescriptionCreate() {

    const router = useRouter();

    useEffect(() => {

        fetch('http://127.0.0.1:3001/prescriptions', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            }
        }).then(response => response.json())
            .then(
                data => {
                    setPrescriptions(data);
                }
            );
    }, []);

    const [file, setFile] = useState<Blob>();
    const [error, setError] = useState<string | unknown>('');

    const [prescriptions, setPrescriptions] = useState(new Array());

    const uploadPrescription = async (id: any) => {
        try {

            const res = await fetch('http://127.0.0.1:3001/uploadPrescription/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
                body: file
            });

            router.push('/prescription/upload');
            // handle the error
            if (!res.ok)
                throw new Error(await res.text());
        } catch (error) {
            setError(error);
        }
    };

    const showFile = async (id: any) => {
        try {

            const res = await fetch('http://127.0.0.1:3001/readPrescription/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': sessionStorage.getItem("token") || ''
                },
            });

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = id + ".pdf";
            link.click();

            // handle the error
            if (!res.ok)
                throw new Error(await res.text());
        } catch (error) {
            setError(error);
        }
    };

    const generatePrescription = async (id: any) => {
        try {

            const res = await fetch('http://127.0.0.1:3001/generatePrescription/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': sessionStorage.getItem("token") || ''
                },
            });

            // handle the error
            if (!res.ok)
                throw new Error(await res.text());

            const content = await res.json();

            if (content._id) {
                window.location.reload();
            } else {
                setError(content.error);
            }
        } catch (error) {
            setError(error);
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

            <div className="mt-6 px-6 py-6 border border-gray-300 rounded-md shadow-sm bg-white overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th className="p-2 border border-gray-300">Data</th>
                            <th className="p-2 border border-gray-300 text-center">Medicine</th>
                            <th className="p-2 border border-gray-300 text-center">Dosage</th>
                            <th className="p-2 border border-gray-300 text-center">Instructions</th>
                            <th className="p-2 border border-gray-300 text-center">Upload</th>
                            <th className="p-2 border border-gray-300 text-center">Gerar</th>
                            <th className="p-2 border border-gray-300 text-center">Arquivo</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!!prescriptions && prescriptions.map((prescription: any) => (
                            <tr key={prescription._id}>
                                <td className="p-2 border border-gray-300">{prescription.date}</td>
                                <td className="p-2 border border-gray-300 text-center">{prescription.medicine}</td>
                                <td className="p-2 border border-gray-300 text-center">{prescription.dosage}</td>
                                <td className="p-2 border border-gray-300 text-center">{prescription.instructions}</td>

                                {!prescription.file && (
                                    <>
                                        <td className="p-2 border border-gray-300 text-center">
                                            <input
                                                type="file"
                                                name="file"
                                                className="border border-gray-300 p-1 rounded"
                                                onChange={(e) => setFile(e.target.files?.[0])}
                                            />
                                        </td>
                                        <td className="p-2 border border-gray-300 text-center">
                                            <button
                                                onClick={() => uploadPrescription(prescription._id)}
                                                className="bg-orange-500 px-3 py-1 rounded text-white text-sm hover:bg-orange-600 transition"
                                            >
                                                Upload
                                            </button>
                                        </td>
                                        <td className="p-2 border border-gray-300 text-center">
                                            <button
                                                onClick={() => generatePrescription(prescription._id)}
                                                className="bg-orange-500 px-3 py-1 rounded text-white text-sm hover:bg-orange-600 transition"
                                            >
                                                Gerar Prescrição
                                            </button>
                                        </td>
                                    </>
                                )}

                                {prescription.file && (
                                    <td className="p-2 border border-gray-300 text-center" colSpan={3}>
                                        <button
                                            onClick={() => showFile(prescription._id)}
                                            className="bg-green-500 px-3 py-1 rounded text-white text-sm hover:bg-green-600 transition"
                                        >
                                            Ver Arquivo
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>

    )
}