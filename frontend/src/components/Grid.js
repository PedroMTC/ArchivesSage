import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("http://localhost:8800/" + id);
      const newArray = users.filter((user) => user.id !== id);

      setUsers(newArray);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }

    setOnEdit(null);
  };

  return (
    <table className="w-full bg-white p-4 shadow-md rounded-md max-w-4xl mx-auto">
      <thead>
        <tr>
          <th className="text-left border-b pb-2">Nome</th>
          <th className="text-left border-b pb-2">Email</th>
          <th className="text-left border-b pb-2 hidden md:table-cell">Fone</th>
          <th className="border-b pb-2"></th>
          <th className="border-b pb-2"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, i) => (
          <tr key={i}>
            <td className="py-2">{item.nome}</td>
            <td className="py-2">{item.email}</td>
            <td className="py-2 hidden md:table-cell">{item.fone}</td>
            <td className="py-2 text-center">
              <FaEdit
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => handleEdit(item)}
              />
            </td>
            <td className="py-2 text-center">
              <FaTrash
                className="text-red-600 hover:text-red-800 cursor-pointer"
                onClick={() => handleDelete(item.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
