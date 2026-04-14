import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory, // Controlador especial para la relación
} from "../controllers/category.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { categorySchema } from "../schemas/category.schema.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", validateSchema(categorySchema), createCategory);
categoryRouter.put("/:id", validateSchema(categorySchema), updateCategory);
categoryRouter.delete("/:id", deleteCategory);

// Ruta Relacional: Obtener productos por categoría
// Sigue el estándar REST: /recurso-padre/:id/recurso-hijo
categoryRouter.get("/:id/products", getProductsByCategory);

export default categoryRouter;
