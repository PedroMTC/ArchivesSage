import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from '../db.js';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autorização não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Verificar se o usuário está autenticado e definir req.userId
    req.userId = decoded.userId;

    next(); // Chamar o próximo middleware
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

export default authMiddleware;