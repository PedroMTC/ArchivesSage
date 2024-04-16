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
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Registro</h2>
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
  );
}

export default RegisterPage;
