import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userModel } from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.handler.js";

export const register = catchAsync(async (req, res) => {
  const newUser = await userModel.create(req.body);
  return successResponse(res, 201, "Usuario registrado con éxito", newUser);
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // 1. Buscar usuario
  const user = await userModel.findByUsername(username);
  if (!user) {
    const error = new Error("Usuario o contraseña incorrectos");
    error.statusCode = 401;
    return next(error);
  }

  // 2. Comparar contraseñas (Plana vs Hash)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Usuario o contraseña incorrectos");
    error.statusCode = 401;
    return next(error);
  }

  // 3. Generar JWT (Expiración de 1 hora)
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "clave_secreta_super_segura",
    { expiresIn: '1h' }
  );

  return successResponse(res, 200, "Login exitoso", { token });
});