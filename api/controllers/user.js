import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const generateToken = (userId, isAdmin) => {
  const payload = {
    userId: userId,
    isAdmin: isAdmin, 
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

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
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const user = results[0];

    const match = await bcrypt.compare(senha, user.senhaHash);

    if (match) {
      const token = generateToken(user.id, user.isAdmin);
      res.status(200).json({ message: "Login bem-sucedido.", user, token });
    } else {
      res.status(401).json({ message: "Email ou senha inválidos." });
    }
  });
};


export const registerUser = (req, res) => {
  const { nome, email, senha, fone, data_nascimento, isAdmin } = req.body;

  if (!nome || !email || !senha || !fone || !data_nascimento || isAdmin === undefined) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  bcrypt.hash(senha, 10, (err, senhaHash) => {
    if (err) {
      console.error("Erro ao hashear senha:", err);
      return res.status(500).json({ message: "Erro ao registrar o usuário." });
    }

    const query = "INSERT INTO usuários (nome, email, senhaHash, fone, data_nascimento, isAdmin) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [nome, email, senhaHash, fone, data_nascimento, isAdmin], (err, result) => {
        if (err) {
            console.error("Erro ao inserir usuário:", err);
            return res.status(500).json({ message: "Erro ao registrar o usuário." });
        }

        res.status(201).json({ message: "Usuário registrado com sucesso." });
    });
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
