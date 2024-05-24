import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const goToRegister = () => {
    navigate('/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/login", {
        email,
        senha,
      });
    
      toast.success("Login bem-sucedido!");
      navigate("/chat"); 

    } catch (error) {
      console.log(error);
      toast.error("Email ou senha inválidos.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-purple-900 text-white py-4">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex justify-between items-center px-4 relative z-10 h-full">
          <h1 className="text-2xl font-bold text-white">Archives Sage</h1>
          <div className="flex items-center">
            <button
              onMouseEnter={e => e.target.style.background = 'linear-gradient(to left, #4299e1, #805ad5)'}
              onMouseLeave={e => e.target.style.background = 'linear-gradient(to left, #805ad5, #4299e1)'}
              onClick={goToRegister}
              className="text-sm px-4 py-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ background: 'linear-gradient(to left, #805ad5, #4299e1)', color: '#fff' }}
            >
              Get Start
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow relative bg-[url('/img/Bguniverse.png')] bg-cover flex justify-center items-center">
        <div className="max-w-sm mx-auto my-20 p-6 bg-purple-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="senha" className="block text-sm font-medium text-white">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="mt-1 block w-full p-2 border rounded-md"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button 
              onMouseEnter={e => e.target.style.background = 'linear-gradient(to left, #4299e1, #805ad5)'} 
              onMouseLeave={e => e.target.style.background = 'linear-gradient(to left, #805ad5, #4299e1)'}
              className="text-sm px-4 py-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ background: 'linear-gradient(to left, #805ad5, #4299e1)', color: '#fff' }}
            >
              Entrar
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-purple-900 text-white ">
        <div className="container mx-auto px-4 text-center">
          <p>Direitos Autorais © 2024 Archive Sage. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
