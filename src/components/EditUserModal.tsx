"use client";

import { useState, useEffect } from 'react';

type User = {
  id: number;
  email: string;
  name: string | null;
};

type EditUserModalProps = {
  user: User | null;
  onClose: () => void;
  onUserUpdated: () => void;
};

export default function EditUserModal({ user, onClose, onUserUpdated }: EditUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      onUserUpdated();
      onClose();
    } catch (error) {
      console.error("Falha ao atualizar usuário:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-400 mb-6">Editar Usuário</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-300">Nome</label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="edit-email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}