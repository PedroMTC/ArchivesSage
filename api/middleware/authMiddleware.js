import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autorização não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next(); 
  } catch (error) {
    // Se o token for inválido ou expirado, responder com erro 401
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

export default authMiddleware;
