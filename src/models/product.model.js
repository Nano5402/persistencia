import pool from "../config/db.js";

export const ProductModel = {
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  // El método que conecta ambos mundos
  findByCategoryId: async (categoryId) => {
    // Usamos el nombre exacto de la columna que definiste en tu SQL: 'categori_id'
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE categori_id = ?",
      [categoryId],
    );
    return rows;
  },

  create: async (newProduct) => {
    // Extraemos los campos que coinciden con nuestra tabla SQL actual
    const { name, categori_id, price } = newProduct;

    const [result] = await pool.query(
      "INSERT INTO products (name, categori_id, price) VALUES (?, ?, ?)",
      [name, categori_id, price],
    );

    const [createdProduct] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [result.insertId],
    );
    return createdProduct[0];
  },

  update: async (id, updatedFields) => {
    const { name, categori_id } = updatedFields;

    const [result] = await pool.query(
      "UPDATE products SET name = ?, categori_id = ? price = ? WHERE id = ?",
      [name, categori_id, id],
    );

    if (result.affectedRows === 0) return null;

    const [updatedProduct] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [id],
    );
    return updatedProduct[0];
  },

  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};
