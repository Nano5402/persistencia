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
import { protect } from "../middlewares/auth.middleware.js";

const productRouter = Router();

productRouter.get("/", protect, getAllProducts);

productRouter.get("/:id", getProductById);

productRouter.post("/", validateSchema(productSchema), createProduct);

productRouter.put("/:id", validateSchema(productSchema), updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
