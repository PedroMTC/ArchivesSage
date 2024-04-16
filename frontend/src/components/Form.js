import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";


const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      if (onEdit) {
        const response = await axios.put(`http://localhost:8800/${onEdit.id}`, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        });
        toast.success(response.data);
      } else {
        const response = await axios.post("http://localhost:8800", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        });
        toast.success(response.data);
      }
    } catch (error) {
      toast.error(error.response?.data || "Erro ao salvar os dados");
    }

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-4 p-4 bg-white shadow-md rounded-md"
    >
      <div className="flex flex-col">
        <label htmlFor="nome" className="text-gray-700">Nome</label>
        <input
          id="nome"
          name="nome"
          type="text"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-gray-700">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="fone" className="text-gray-700">Telefone</label>
        <input
          id="fone"
          name="fone"
          type="text"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="data_nascimento" className="text-gray-700">Data de Nascimento</label>
        <input
          id="data_nascimento"
          name="data_nascimento"
          type="date"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-4">
        SALVAR
      </button>
    </form>
  );
};

export default Form;
