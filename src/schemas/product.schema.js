import { z } from "zod";

export const productSchema = z
  .object({
    name: z
      .string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser un texto válido",
      })
      .min(3, "El nombre debe tener al menos 3 caracteres"),

    categori_id: z.number({
      required_error: "El ID de la categoría es obligatorio",
      invalid_type_error: "El ID de la categoría debe ser un número (no texto ni vacío)"
    })
    .int("El ID de la categoría debe ser un número entero")
    .positive("El ID de la categoría debe ser un número positivo"),

    price: z
      .number({
        required_error: "El precio es obligatorio",
        invalid_type_error: "El precio debe ser un número válido",
      })
      .nonnegative("El precio no puede ser negativo"),
  })
  .strict("No envíes campos adicionales que no pertenecen al producto");
