const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Token ausente." });

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ error: "Configuração JWT inválida." });
    const payload = jwt.verify(token, secret);
    req.user = { idCliente: payload.idCliente, email: payload.email, sub: payload.idCliente };
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}

function ensureSelf(req, res, next) {
  const routeId = String(req.params.id);
  const requester = String(req.user?.idCliente || "");
  if (routeId !== requester) return res.status(403).json({ error: "Acesso negado." });
  next();
}

module.exports = auth;
module.exports.ensureSelf = ensureSelf;