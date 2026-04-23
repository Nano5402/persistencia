import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { productSchema } from "../schemas/product.schema.js";

// Importo los módulos de seguridad para el manejo de autenticación y autorización
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";

const productRouter = Router();

// Defino los endpoints de acceso público o de solo lectura
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

// --- SOLUCIÓN RETO 2: RUTAS PROTEGIDAS ---
// Implemento una tubería (pipeline) de validación secuencial: 
// 1. validateSchema: Sanitiza y valida el payload contra el esquema estricto de Zod.
// 2. protect: Verifica la firma y vigencia del JWT.
// 3. authorize: Evalúa el nivel de privilegios del usuario.
// 4. Controlador: Ejecuta la lógica de persistencia si se superan las capas previas.
productRouter.post(
  "/", 
  validateSchema(productSchema), 
  protect, 
  authorize('products.create'),
  createProduct
);

productRouter.put(
  "/:id", 
  validateSchema(productSchema), 
  protect,
  authorize('products.update'), 
  updateProduct
);

productRouter.delete(
  "/:id", 
  protect,
  authorize('products.delete'),
  deleteProduct
);

export default productRouter;