import { Router } from "express";
import { login, register, refreshToken } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema, refreshTokenSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/register", validateSchema(registerSchema), register);
authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.post("/refresh", validateSchema(refreshTokenSchema), refreshToken);

export default authRouter;