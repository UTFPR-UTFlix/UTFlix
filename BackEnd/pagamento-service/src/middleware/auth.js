import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Token ausente." });

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "Configuração JWT inválida." });
    const payload = jwt.verify(token, secret);
    req.user = { idCliente: payload.idCliente, email: payload.email, sub: payload.idCliente };
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}