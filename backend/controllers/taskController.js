const pool = require('../config/db');

exports.createTask = async (req, res) => {
  try {
    const { title, description, project_id, assigned_to, deadline } = req.body;

    const task = await pool.query(
      "INSERT INTO tasks(title,description,project_id,assigned_to,deadline,status) VALUES($1,$2,$3,$4,$5,'pending') RETURNING *",
      [title, description, project_id, assigned_to, deadline]
    );

    res.json(task.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    let query = `
      SELECT t.*, p.name as project_name, u.name as assignee_name 
      FROM tasks t 
      LEFT JOIN projects p ON t.project_id = p.id 
      LEFT JOIN users u ON t.assigned_to = u.id
    `;
    let params = [req.user.id];

    if (req.user.role === 'member') {
      query += ` WHERE t.assigned_to = $1`;
    } else {
      // HR only sees tasks under projects they created
      query += ` WHERE p.created_by = $1`;
    }

    query += ` ORDER BY t.created_at DESC`;

    const tasks = await pool.query(query, params);
    res.json(tasks.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await pool.query(
      "UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *",
      [status, req.params.id]
    );

    res.json(task.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};