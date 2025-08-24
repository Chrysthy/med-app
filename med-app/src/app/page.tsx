"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const [login, setLogin] = useState<string>(''); //hook
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>('');

  const authentication = async (e: any) => {

    e.preventDefault();
    setError(null);

    if (login != "" && password != "") {

      const formData = {
        login: login,
        password: password
      }

      const add = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)

      })

      const content = await add.json();

      if (content.token) {
        sessionStorage.setItem("token", content.token);

        router.push('/home');

      } else {
        setError(content.error);
      }

    }

  }


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <form className='w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md' onSubmit={authentication}>

          <span className='font-bold py-2 block text-3xl text-center'>Login</span>

          <div className='w-full py-2'>
            <label htmlFor="" className='text-sm font-bold py-2 block'>Usuário</label>
            <input
              type='text'
              name='name'
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
              onChange={(e: any) => setLogin(e.target.value)}
            />
          </div>

          <div className='w-full py-2'>
            <label htmlFor="" className='text-sm font-bold py-2 block'>Senha</label>
            <input
              name='login'
              type="password"
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>

          <div className='w-full py-2'>
            <button className="w-full p-2 text-white rounded-sm bg-green-500 hover:bg-green-600 transition-colors cursor-pointer">
              Login
            </button>
          </div>

          {error && (
            <div className="p-2 mt-2 text-white bg-red-500 rounded-sm border border-red-600">
              {error}
            </div>
          )}

        </form>


      </div>
    </>
  );
}