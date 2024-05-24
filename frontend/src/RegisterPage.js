import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterPage({ getUsers }) {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [fone, setFone] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");


  const goToLogin = () => {
    navigate('/login');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/register", {
        nome,
        email,
        senha,
        fone,
        data_nascimento,
      });

      toast.success("Registro bem-sucedido!");

      setNome("");
      setEmail("");
      setSenha("");
      setFone("");
      setDataNascimento("");

      getUsers();

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Falha no registro. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-purple-900 text-white py-4">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex justify-between items-center px-4 relative z-10 h-full">
          <h1 className="text-2xl font-bold text-white">Archives Sage</h1>
          <div className="flex items-center">
            <button
              onMouseEnter={e => e.target.style.background = 'linear-gradient(to left, #4299e1, #805ad5)'}
              onMouseLeave={e => e.target.style.background = 'linear-gradient(to left, #805ad5, #4299e1)'}
              onClick={goToLogin}
              className="text-sm mr-4 px-4 py-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ background: 'linear-gradient(to left, #805ad5, #4299e1)', color: '#fff' }}
            >
              Login
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow relative bg-[url('/img/Bguniverse.png')] bg-cover flex justify-center items-center">        
        <div className="max-w-sm mx-auto my-20 p-6 bg-purple-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Registro</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Telefone"
              value={fone}
              onChange={(e) => setFone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="date"
              value={data_nascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
              Registrar
            </button>
          </form>
        </div>
      </main>
      <footer className="bg-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>Direitos Autorais © 2024 Archive Sage. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default RegisterPage;
