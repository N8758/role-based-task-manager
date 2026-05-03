const pool = require('../config/db');

exports.getUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT id, name, email, role FROM users WHERE role = 'member'");
    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
