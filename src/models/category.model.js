import pool from "../config/db.js";

export const CategoryModel = {
  // 1. Obtener todas las categorías
  findAll: async () => {
    // mysql2 devuelve un arreglo donde la posición [0] son los datos (rows)
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
  },

  // 2. Obtener una categoría por ID
  findById: async (id) => {
    // El signo '?' es un marcador de posición para evitar Inyección SQL
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [
      id,
    ]);
    return rows[0]; // Retorna el objeto encontrado o undefined si no existe
  },

  // 3. Crear una nueva categoría
  create: async (newCategory) => {
    const { name } = newCategory;
    const [result] = await pool.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name],
    );

    // result.insertId contiene el ID autogenerado por MySQL
    const [createdCategory] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [result.insertId],
    );
    return createdCategory[0];
  },

  // 4. Actualizar una categoría
  update: async (id, updatedFields) => {
    const { name } = updatedFields;
    const [result] = await pool.query(
      "UPDATE categories SET name = ? WHERE id = ?",
      [name, id],
    );

    // Si affectedRows es 0, significa que el ID no existía
    if (result.affectedRows === 0) return null;

    // Buscamos cómo quedó el registro después de actualizarlo
    const [updatedCategory] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [id],
    );
    return updatedCategory[0];
  },

  // 5. Eliminar una categoría
  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [
      id,
    ]);
    // Si affectedRows es mayor a 0, se eliminó con éxito
    return result.affectedRows > 0;
  },
};
