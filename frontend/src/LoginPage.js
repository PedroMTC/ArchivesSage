import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8800/login", {
        email,
        senha,
      });

      toast.success("Login bem-sucedido!");
      navigate("/CRUD");
    } catch (error) {
      console.log(error);
      toast.error("Email ou senha inválidos.");
    }
  };

  return (
    <div class="max-w-sm mx-auto my-20 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
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
        <button type="submit" className="btn">Entrar</button>

      </form>
    </div>
  );
}

export default LoginPage;
