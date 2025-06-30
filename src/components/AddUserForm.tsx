"use client";

import { useState } from 'react';

export default function AddUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // PASSO 1: A FUNÇÃO DE ENVIO
  // Ela precisa ser 'async' porque vai fazer uma requisição de rede.
  // O 'e: React.FormEvent' é TypeScript nos ajudando a saber o tipo do evento.
  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault() impede que a página recarregue, que é o comportamento padrão de um formulário.
    e.preventDefault();

    try {
      // Usamos o 'fetch' para fazer a requisição POST para nossa API
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST', // Definimos o método como POST
        headers: {
          'Content-Type': 'application/json', // Avisamos que estamos enviando JSON
        },
        // No 'body', transformamos nosso estado (name, email) em uma string JSON
        body: JSON.stringify({ name, email }),
      });

      // Se a resposta não for OK (ex: erro 500 no servidor), a gente lança um erro.
      if (!response.ok) {
        throw new Error('Falha ao criar usuário');
      }

      // Se tudo deu certo, a gente pode, por exemplo, limpar o formulário.
      setName('');
      setEmail('');
      
      console.log('Usuário criado com sucesso!');
      // AQUI VEM A MÁGICA: como fazer a lista de usuários atualizar automaticamente?
      // Por enquanto, vamos precisar recarregar a página manualmente para ver o novo usuário.
      // Mais para frente, a gente aprende a fazer isso de forma mais elegante.
      window.location.reload();

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-purple-400 mb-4">Adicionar Novo Usuário</h2>
      
      {/* PASSO 2: Conectando a nossa função ao 'onSubmit' do formulário */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-purple-500 focus:border-purple-500"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-purple-500 focus:border-purple-500"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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