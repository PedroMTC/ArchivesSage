import express from 'express';
import { addUser, deleteUser, getUsers, updateUser, registerUser, loginUser } from "../controllers/user.js";
import sendMessage from "../utils/sendMessage.js";
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises'; // Importe fs com promises para lidar com operações assíncronas

const router = express.Router();

// Configuração do armazenamento do Multer
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const userId = req.userId; // Supondo que você tenha o ID do usuário disponível no token JWT
    if (!userId) {
      return cb(new Error('ID do usuário não encontrado na solicitação'), null);
    }
    const userUploadsDir = path.join('uploads', userId.toString());

    // Verificar se o diretório do usuário existe
    try {
      await fs.access(userUploadsDir); // Verificar se o diretório existe
    } catch (error) {
      // Se não existe, criar o diretório
      await fs.mkdir(userUploadsDir, { recursive: true });
    }

    cb(null, userUploadsDir); // Pasta onde os arquivos serão salvos
  },
  filename: async function (req, file, cb) {
    const userId = req.userId; // Obtém o ID do usuário da requisição
    const ext = path.extname(file.originalname); // Obtém a extensão do arquivo original
    // Verificar se já existe um arquivo para o usuário
    const userUploadsDir = path.join('uploads', userId.toString());
    const files = await fs.readdir(userUploadsDir);

    let filename;
    if (files.length > 0) {
      // Se houver arquivo existente, deletar o arquivo anterior
      const existingFile = path.join(userUploadsDir, files[0]);
      await fs.unlink(existingFile);
      filename = `${userId}${ext}`; // Nome do arquivo com ID do usuário e extensão original
    } else {
      filename = `${userId}${ext}`; // Nome do arquivo com ID do usuário e extensão original
    }

    cb(null, filename); // Nome do arquivo
  }
});

const upload = multer({ storage: storage });

// Rotas
router.get("/", getUsers);
router.post("/", addUser);
router.put("/", authMiddleware, updateUser);
router.delete("/", deleteUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/send-message", authMiddleware, sendMessage);
router.get("/chat", authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Bem-vindo ao chat!', userId: req.userId });
});

// Rota de upload de PDF
router.post("/upload-pdf", authMiddleware, upload.single('pdfFile'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "Nenhum arquivo selecionado." });
  }

  // Validação da extensão do arquivo
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return res.status(400).json({ message: "Extensão do arquivo não permitida." });
  }

  // Aqui você pode prosseguir com o processamento ou salvar o arquivo
  res.status(200).json({ message: "Arquivo enviado com sucesso.", filename: file.filename });
});

export default router;