import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// 1. IMPORTACIÓN CON LLAVES Y MINÚSCULA
import { userModel } from "../models/user.model.js"; 
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.handler.js";

export const register = catchAsync(async (req, res) => {
  // 2. Usar userModel con minúscula
  const newUser = await userModel.create(req.body);
  return successResponse(res, 201, "Usuario registrado exitosamente", newUser);
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // 3. Usar userModel con minúscula
  const user = await userModel.findByUsername(username);
  if (!user) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    return next(error);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    return next(error);
  }

  const accessToken = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return successResponse(res, 200, "Login exitoso", { accessToken, refreshToken });
});

export const refreshToken = catchAsync(async (req, res, next) => {
  const tokenToRefresh = req.body.refreshToken;

  try {
    const decoded = jwt.verify(tokenToRefresh, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id, username: decoded.username, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return successResponse(res, 200, "Token renovado exitosamente", { accessToken: newAccessToken });
  } catch (err) {
    const error = new Error("Refresh token inválido o expirado. Vuelve a iniciar sesión.");
    error.statusCode = 403;
    return next(error);
  }
});