// Definindo um "molde" para os nossos dados de usuário com TypeScript
// Isso nos ajuda a evitar erros e ter autocomplete no código.
import AddUserForms from "@/components/AddUserForm";
type User = {
  id: number;
  email: string;
  name: string | null; // O nome pode ser nulo (opcional)
  createdAt: string;
};

// Função para buscar os usuários da nossa API
async function getUsers(): Promise<User[]> {
  // A gente faz um 'fetch' (uma requisição HTTP) para o nosso back-end
  const res = await fetch('http://localhost:3000/users', {
    cache: 'no-store', // Diz ao Next.js para sempre buscar os dados mais recentes
  });

  // Tratamento de erro básico
  if (!res.ok) {
    throw new Error('Falha ao buscar usuários');
  }

  return res.json();
}

// A nossa página agora é 'async' para poder esperar os dados!
export default async function Home() {
  const users = await getUsers();

  return (
    <main>
      <AddUserForms />
      <h1 className="text-4xl font-bold text-purple-400 mb-8">
        Dashboard de Usuários
      </h1>
      
      {/* Container para os nossos cards de usuário */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Usamos o .map() para transformar cada item do array 'users' em um card JSX */}
        {users.map((user) => (
          // A 'key' é importante para o React saber identificar cada item da lista
          <div key={user.id} className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">{user.name || 'Usuário Sem Nome'}</h3>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-500 mt-4">ID: {user.id}</p>
          </div>
        ))}
      </div>
    </main>
  );
}