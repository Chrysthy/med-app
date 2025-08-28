"use client"

import React from "react";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function FakeApi() {

    const [fakeApiData, setFakeApiData] = useState(null);

    const requestFakeApi = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setFakeApiData(response.data);
        } catch (e) {
            console.log(e);
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

            <div className="mt-6 px-6 py-6 border border-gray-300 rounded-md shadow-sm bg-white max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Dados Fake API</h1>

                <button
                    className="bg-green-500 px-4 py-2 rounded-md text-white text-sm hover:bg-green-600 transition mb-4"
                    onClick={() => requestFakeApi()}
                >
                    Buscar dados Fake API
                </button>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 border-b border-gray-300">
                            <tr>
                                <th className="p-2 border border-gray-300">Name</th>
                                <th className="p-2 border border-gray-300 text-center">Username</th>
                                <th className="p-2 border border-gray-300 text-center">Email</th>
                                <th className="p-2 border border-gray-300 text-center">Phone</th>
                            </tr>
                        </thead>

                        <tbody>
                            {!!fakeApiData && fakeApiData.map((data: any, index: number) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-2 border border-gray-300">{data.name}</td>
                                    <td className="p-2 border border-gray-300 text-center">{data.username}</td>
                                    <td className="p-2 border border-gray-300 text-center">{data.email}</td>
                                    <td className="p-2 border border-gray-300 text-center">{data.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}