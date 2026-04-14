import pool from "../config/db.js"
import bcrypt from "bcryptjs"

export const userModel = {
    create: async (userData) => {
        const { username, password, role } = userData;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await pool.query (
            "INSERT INTO users (username, password, role) VALUES ( ?, ?, ? )",
            [username, hashedPassword, role]
        )

        return { id: result.insertId, username, role };
    },

    findByUsername: async (username) => {
        const [ rows ] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        return rows[0];
    }
};