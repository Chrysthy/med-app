"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PacientCreate() {

    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addPacient = async (e: any) => {
        e.preventDefault();
        setError(null);

        if (name != "" && birthDate != ""
            && email != "" && phone != "") {

            const formData = {
                name: name,
                birthDate: birthDate,
                email: email,
                phone: phone
            }

            const add = await fetch('http://127.0.0.1:3001/postPacient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
                body: JSON.stringify(formData)
            });

            const content = await add.json();

            if (content.name) {
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

            <form className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6" onSubmit={addPacient}>
                <span className="block mb-4 text-2xl font-bold text-yellow-600 underline">
                    Formulário de Paciente
                </span>

                {/* Nome */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-bold">Nome</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Data de Nascimento */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-bold">Nascimento</label>
                    <input
                        type="date"
                        name="birthDate"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-bold">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Telefone */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-bold">Telefone</label>
                    <input
                        type="tel"
                        name="phone"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {/* Botão */}
                <div className="mb-4">
                    <button
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