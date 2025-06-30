"use client";

import { useEffect, useState } from 'react';
import AddUserForm from '@/components/AddUserForm';
import EditUserModal from '@/components/EditUserModal';

// Definindo o "molde" do nosso objeto User
type User = {
  id: number;
  email: string;
  name: string | null;
  createdAt: string; // Adicionamos para bater com os dados que vêm da API
  updatedAt: string; // Adicionamos também
};

// A nossa página principal
export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Função para buscar os usuários da API
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/users');
      if (!res.ok) throw new Error("Falha ao buscar dados");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect vai rodar uma vez quando o componente carregar
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para deletar um usuário
  const handleDelete = async (userId: number) => {
    try {
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
      fetchUsers(); // Atualiza a lista após deletar
    } catch (error) {
      console.error("Falha ao deletar usuário:", error);
    }
  };

  return (
    <main className="p-8">
      <AddUserForm onUserAdded={fetchUsers} />
      
      <h1 className="text-4xl font-bold text-purple-400 my-8 text-center">
        Dashboard de Usuários
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{user.name || 'Usuário Sem Nome'}</h3>
              <p className="text-gray-400 break-words">{user.email}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => setEditingUser(user)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(user.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <<< A LÂMPADA QUE FALTAVA! >>> */}
      <EditUserModal 
        user={editingUser} 
        onClose={() => setEditingUser(null)}
        onUserUpdated={fetchUsers}
      />
    </main>
  );
}