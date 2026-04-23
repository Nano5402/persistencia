import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userModel } from "../models/user.model.js"; 
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.handler.js";

// Aplico el wrapper catchAsync para centralizar la resolución de promesas y delegar el manejo de excepciones al middleware global
export const register = catchAsync(async (req, res) => {
  const newUser = await userModel.create(req.body);
  return successResponse(res, 201, "Usuario registrado exitosamente", newUser);
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // Verifico la existencia del usuario consultando la base de datos
  const user = await userModel.findByUsername(username);
  if (!user) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    return next(error);
  }

  // Comparo la contraseña en texto plano recibida en el request contra el hash almacenado
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    return next(error);
  }

  // --- SOLUCIÓN RETO 1 ---
  // Consulto la matriz de permisos asociados al rol del usuario autenticado
  const userPermissions = await userModel.getPermissionsByRole(user.role);

  // Genero el Access Token inyectando los permisos en el payload. 
  // Esto optimiza la validación en rutas futuras al evitar consultas redundantes a la BD.
  const accessToken = jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      role: user.role,
      permissions: userPermissions 
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  // Genero el Refresh Token con un tiempo de expiración prolongado para mantener la sesión
  const refreshToken = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // Estructuro la respuesta final mediante el response handler, incluyendo el nodo 'roles' según el requerimiento técnico
  return successResponse(res, 200, "Login exitoso", { 
    accessToken, 
    refreshToken,
    roles: userPermissions 
  });
});

export const refreshToken = catchAsync(async (req, res, next) => {
  const tokenToRefresh = req.body.refreshToken;

  try {
    // Verifico la validez y firma del token de refresco
    const decoded = jwt.verify(tokenToRefresh, process.env.JWT_REFRESH_SECRET);

    // Genero un nuevo Access Token persistiendo los permisos decodificados en la sesión actual
    const newAccessToken = jwt.sign(
      { 
        id: decoded.id, 
        username: decoded.username, 
        role: decoded.role,
        permissions: decoded.permissions 
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return successResponse(res, 200, "Token renovado exitosamente", { accessToken: newAccessToken });
  } catch (err) {
    // Intercepto errores de expiración o alteración de firma para exigir una nueva autenticación
    const error = new Error("Refresh token inválido o expirado. Vuelve a iniciar sesión.");
    error.statusCode = 403;
    return next(error);
  }
});