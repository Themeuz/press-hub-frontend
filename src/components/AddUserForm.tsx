"use client";

import { useState } from 'react';

type AddUserFormProps = {
  onUserAdded: () => void;
};

export default function AddUserForm({ onUserAdded }: AddUserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) throw new Error('Falha ao criar usuário');

      setName('');
      setEmail('');
      onUserAdded();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-purple-400 mb-4">Adicionar Novo Usuário</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}