const pool = require('../config/db');

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await pool.query(
      "INSERT INTO projects(name,created_by) VALUES($1,$2) RETURNING *",
      [name, req.user.id]
    );

    res.json(project.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    let query = "SELECT * FROM projects";
    let params = [];
    
    if (req.user.role === 'admin') {
      query += " WHERE created_by = $1";
      params.push(req.user.id);
    }
    
    const projects = await pool.query(query, params);
    res.json(projects.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};