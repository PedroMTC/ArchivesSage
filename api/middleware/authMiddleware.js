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

    db.query('SELECT * FROM usuarios WHERE id = ? AND isAdmin = true', [decoded.userId], (err, results) => {
      if (err) {
        console.error('Erro ao consultar usuário:', err);
        return res.status(500).json({ message: 'Erro ao consultar o usuário.' });
      }

      if (results.length === 0) {
        return res.status(403).json({ message: 'Acesso não autorizado.' });
      }

      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

export default authMiddleware;
