"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PrescriptionCreate(params: any) {

    const router = useRouter();

    const [date, setDate] = useState<string>('');
    const [medicine, setMedicine] = useState<string>('');
    const [dosage, setDosage] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const appointmentId = params.params.id;

    const addPrescription = async (e: any) => {
        e.preventDefault();
        setError(null);

        if (date != "" && medicine != "" && dosage != "") {

            const formData = {
                date: date,
                appointmentId: appointmentId,
                medicine: medicine,
                dosage: dosage,
                instructions: instructions
            }

            const add = await fetch('http://127.0.0.1:3001/postPrescription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
                body: JSON.stringify(formData)
            });

            const content = await add.json();

            if (content.date) {
                router.push('/home');
            } else {
                setError(content.error);
            }

        }


    };

    return (
        <>
            <div className="w-full flex justify-end mt-6 pr-6">
                <Link
                    href="/appointment/list"
                    className="w-32 p-3 text-white rounded-md bg-blue-500 hover:bg-blue-600 transition cursor-pointer text-center"
                >
                    Voltar
                </Link>
            </div>

            <div className="mt-6 px-6 py-6 border border-gray-300 rounded-md shadow-sm bg-white max-w-3xl mx-auto">
                <form className="w-full" onSubmit={addPrescription}>
                    <h2 className="text-2xl font-bold text-yellow-500 underline mb-4">Formulário de prescrição</h2>

                    <div className="w-full mb-4">
                        <label className="block text-sm font-bold mb-2">Data da prescrição</label>
                        <input
                            type="date"
                            name="date"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={(e: any) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-sm font-bold mb-2">Medicamento</label>
                        <textarea
                            name="medicine"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={(e: any) => setMedicine(e.target.value)}
                        />
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-sm font-bold mb-2">Dosagem</label>
                        <textarea
                            name="dosage"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={(e: any) => setDosage(e.target.value)}
                        />
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-sm font-bold mb-2">Instruções de uso</label>
                        <textarea
                            name="instructions"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={(e: any) => setInstructions(e.target.value)}
                        />
                    </div>

                    <div className="w-full flex justify-end">
                        <button
                            type="submit"
                            className="w-28 p-2 text-white rounded-md bg-green-500 hover:bg-green-600 transition
                            cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 p-2 rounded-md bg-red-400 text-white border border-gray-200">
                            {error}
                        </div>
                    )}
                </form>
            </div>

        </>
    )
}