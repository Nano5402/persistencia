import { CategoryModel } from "../models/category.model.js";
import { ProductModel } from "../models/product.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.handler.js";

// Envolvemos toda la función en catchAsync()
const getAllCategories = catchAsync(async (req, res) => {
  const categories = await CategoryModel.findAll();
  return successResponse(res, 200, "Lista de categorías", categories);
});

const getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(Number(id));

  if (!category) {
    // Si no existe, creamos un error personalizado y lo enviamos al middleware
    const error = new Error(`Categoría con ID ${id} no encontrada`);
    error.statusCode = 404;
    return next(error);
  }

  return successResponse(
    res,
    200,
    "Categoría encontrada correctamente",
    category,
  );
});

const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const newCategory = await CategoryModel.create({ name });
  return successResponse(
    res,
    201,
    "Categoría creada correctamente",
    newCategory,
  );
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedCategory = await CategoryModel.update(Number(id), req.body);
  if (!updatedCategory) {
    const error = new Error(`Categoría con ID ${id} no encontrada`);
    error.statusCode = 404;
    return next(error);
  }
  return successResponse(
    res,
    200,
    "Categoría actualizada correctamente",
    updatedCategory,
  );
});

// RETO DE INTEGRIDAD
const deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const categoryExists = await CategoryModel.findById(Number(id));
  if (!categoryExists) {
    const error = new Error(
      `No se pudo eliminar: Categoría con ID ${id} no encontrada`,
    );
    error.statusCode = 404;
    return next(error);
  }

  const linkedProducts = await ProductModel.findByCategoryId(Number(id));
  if (linkedProducts && linkedProducts.length > 0) {
    const error = new Error(
      "No se puede eliminar la categoría porque tiene recursos vinculados",
    );
    error.statusCode = 409;
    return next(error);
  }

  await CategoryModel.delete(Number(id));
  return successResponse(res, 200, "Categoría eliminada correctamente");
});

const getProductsByCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const categoryExists = await CategoryModel.findById(Number(id));
  if (!categoryExists) {
    const error = new Error(`La categoría con ID ${id} no existe`);
    error.statusCode = 404;
    return next(error);
  }

  const products = await ProductModel.findByCategoryId(Number(id));
  return successResponse(
    res,
    200,
    `Productos de la categoría: ${categoryExists.name}`,
    products,
  );
});

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
};
