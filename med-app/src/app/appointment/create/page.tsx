"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function AppointmentCreate() {

    const router = useRouter();

    const [date, setDate] = useState<string>('');
    const [doctorId, setDoctorId] = useState<string>('');
    const [pacientId, setPacientId] = useState<string>('');
    const [doctors, setDoctors] = useState(new Array());
    const [pacients, setPacients] = useState(new Array());

    const [error, setError] = useState<string | null>(null);

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

    const addAppointment = async (e: any) => {
        e.preventDefault();
        setError(null);

        if (date != "" && doctorId != ""
            && pacientId != "") {

            const formData = {
                date: date,
                doctorId: doctorId,
                pacientId: pacientId
            }

            const add = await fetch('http://127.0.0.1:3001/postAppointment', {
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
                    href="/home"
                    className="w-32 p-3 text-white rounded-md bg-blue-500 hover:bg-blue-600 transition cursor-pointer text-center"
                >
                    Voltar
                </Link>
            </div>

            <form
                className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6"
                onSubmit={addAppointment}
            >
                <span className="block mb-4 text-2xl font-bold text-yellow-600 underline">
                    Formulário de Consultas
                </span>

                {/* Data */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-bold">Data</label>
                    <input
                        type="datetime-local"
                        name="date"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        onChange={(e: any) => setDate(e.target.value)}
                    />
                </div>

                {/* Médico */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-bold">Médico</label>
                    <select
                        id="doctorId"
                        onChange={(e: any) => setDoctorId(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    >
                        {doctors.map((doctor, i) => (
                            <option key={i} value={doctor._id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Paciente */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-bold">Paciente</label>
                    <select
                        id="pacientId"
                        onChange={(e: any) => setPacientId(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    >
                        {pacients.map((pacient, i) => (
                            <option key={i} value={pacient._id}>
                                {pacient.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botão */}
                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full py-2 text-white rounded-md bg-green-500 hover:bg-green-600 transition"
                    >
                        Enviar
                    </button>
                </div>

                {/* Erro */}
                {error && (
                    <div className="p-2 text-sm text-white rounded-md bg-red-500">
                        {error}
                    </div>
                )}
            </form>

        </>
    )
}