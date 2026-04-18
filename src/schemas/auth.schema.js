import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es obligatorio",
      invalid_type_error: "El nombre de usuario debe ser texto",
    })
    .min(4, "El usuario debe tener al menos 4 caracteres")
    .max(50, "El usuario no puede exceder los 50 caracteres"),
  
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),

  role: z
    .enum(['admin', 'user', 'worker'], {
      invalid_type_error: "El rol solo puede ser 'admin', 'user' o 'worker'",
    })
    .optional(), 
}).strict("No envíes campos adicionales");

export const loginSchema = z.object({
  username: z.string({ required_error: "El usuario es obligatorio" }),
  password: z.string({ required_error: "La contraseña es obligatoria" })
}).strict();

export const refreshTokenSchema = z.object({
  refreshToken: z.string({ 
    required_error: "El refresh token es obligatorio" 
  })
}).strict();