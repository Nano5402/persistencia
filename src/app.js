import express from "express";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import "./config/db.js";
import authRouter from "./routes/auth.routes.js";

// 1. Importamos nuestro manejador global
import { globalErrorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    messaje: "Saludo de la API",
    data: [],
    errors: [],
  });
})

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);

// 2. Conectamos el Middleware Global de Errores al final de todas las rutas
app.use(globalErrorHandler);

export default app;