import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const userModel = {
  create: async (userData) => {
    const { username, password, role } = userData;
    
    // Genero el factor de aleatoriedad (salt) y aplico la función de hash criptográfico antes de la persistencia
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role || 'user']
    );

    return { id: result.insertId, username, role };
  },

  findByUsername: async (username) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0];
  },

  // --- SOLUCIÓN RETO 1 ---
  // Desarrollo un método simulado para mapear el control de acceso basado en roles (RBAC).
  // En una arquitectura relacional completa, esto requeriría un JOIN contra una tabla de roles_permisos.
  getPermissionsByRole: async (role) => {
    if (role === 'admin') {
      return ['products.create', 'products.read', 'products.update', 'products.delete'];
    }
    if (role === 'worker') {
      return ['products.read', 'products.update'];
    }
    // Aplico el Principio de Menor Privilegio retornando solo capacidad de lectura por defecto
    return ['products.read']; 
  }
};