"use client"
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function DoctorCreate() {

    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [medicalSpecialty, setMedicalSpecialty] = useState<string>('');
    const [medicalRegistration, setMedicalRegistration] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addDoctor = async (e: any) => {
        e.preventDefault();
        setError(null);

        if (name != "" && login != ""
            && password != "" && medicalSpecialty != ""
            && medicalRegistration != "" && email != "" && phone != "") {

            const formData = {
                name: name,
                login: login,
                password: password,
                medicalSpecialty: medicalSpecialty,
                medicalRegistration: medicalRegistration,
                email: email,
                phone: phone
            }

            const add = await fetch('http://127.0.0.1:3001/postDoctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
                body: JSON.stringify(formData)
            });

            const content = await add.json();

            if (content.login) {
                router.push('/home');
            } else {
                setError(content.error);
            }

        }


    };

    return (

        <>
            {/* Link de Voltar */}

            <div className="w-full flex justify-end mt-6 pr-6">
                <Link
                    href="/home"
                    className="w-32 p-3 text-white rounded-md bg-blue-500 hover:bg-blue-600 transition cursor-pointer text-center"
                >
                    Voltar
                </Link>
            </div>

            {/* Formulário */}
            <form
                className="w-full max-w-lg mx-auto p-6 bg-white rounded-md shadow-md"
                onSubmit={addDoctor}
            >
                <span className="font-bold text-yellow-500 py-2 block underline text-2xl text-center">
                    Formulário de Criação de Médico
                </span>

                {/* Nome */}
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Nome</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        onChange={(e: any) => setName(e.target.value)}
                    />
                </div>

                {/* Login */}
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Login</label>
                    <textarea
                        name="login"
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        onChange={(e: any) => setLogin(e.target.value)}
                    />
                </div>

                {/* Senha */}
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Senha</label>
                    <textarea
                        name="password"
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                </div>

                {/* Especialidade Médica */}
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Especialidade Médica</label>
                    <textarea
                        name="medicalSpecialty"
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        onChange={(e: any) => setMedicalSpecialty(e.target.value)}
                    />
                </div>

                {/* Registro Médico */}
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Registro Médico</label>
                    <textarea
                        name="medicalRegistration"
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        onChange={(e: any) => setMedicalRegistration(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Email</label>
                    <textarea
                        name="email"
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                </div>

                {/* Telefone */}
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Telefone</label>
                    <textarea
                        name="phone"
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        onChange={(e: any) => setPhone(e.target.value)}
                    />
                </div>

                {/* Botão Submit */}
                <div className="w-full py-4 flex justify-center">
                    <button className="w-32 p-3 text-white rounded-md bg-green-500 hover:bg-green-600 transition cursor-pointer">
                        Submit
                    </button>
                </div>

                {/* Mensagem de erro */}
                {error && (
                    <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-500 mt-2 text-center">
                        {error}
                    </div>
                )}
            </form>
        </>

    )
}

