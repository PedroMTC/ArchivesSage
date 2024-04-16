import { db } from "../db.js";
import bcrypt from "bcrypt"; // Para hash de senha

export const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  const query = "SELECT * FROM usuários WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Erro ao consultar usuário:", err);
      return res.status(500).json({ message: "Erro ao consultar o usuário." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Email ou senha inválidossssss." });
    }

    const user = results[0];

    const match = senha.localeCompare(user.senha);

    console.log(user+"user")
    console.log(match+"match")
    console.log(senha+"senha")
    console.log(user.senha)
    if (!match) {
      res.status(200).json({ message: "Login bem-sucedido.", user });

    } else {
      res.status(401).json({ message: "Email ou senha inválidos." });
    }
  });
};


export const registerUser = (req, res) => {
  const { nome, email, senha, fone, data_nascimento } = req.body;

  if (!nome || !email || !senha || !fone || !data_nascimento) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  const query = "INSERT INTO usuários (nome, email, senha, fone, data_nascimento) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [nome, email, senha, fone, data_nascimento], (err, result) => {
      if (err) {
          console.error("Erro ao inserir usuário:", err);
          return res.status(500).json({ message: "Erro ao registrar o usuário." });
      }

      res.status(201).json({ message: "Usuário registrado com sucesso." });
  });
};

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuários";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuários(`nome`, `email`, `fone`, `data_nascimento`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuários SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuários WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
