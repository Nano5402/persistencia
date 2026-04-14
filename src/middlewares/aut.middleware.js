import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  // Verificamos si el token viene en el header 'Authorization'
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    const error = new Error("No tienes permiso para acceder. Por favor, inicia sesión.");
    error.statusCode = 401;
    return next(error);
  }

  try {
    // Validar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "clave_secreta_super_segura");
    req.user = decoded; // Inyectamos los datos del usuario en la petición
    next();
  } catch (err) {
    const error = new Error("Sesión expirada o token inválido");
    error.statusCode = 401;
    return next(error);
  }
};