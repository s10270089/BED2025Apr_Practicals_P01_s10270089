const path = require('path');
const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');

// Database configuration
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down database pool...');
  await pool.close();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Routes

// GET /students: Retrieve all students
app.get('/students', async (req, res) => {
  try {
    await poolConnect;
    const result = await pool.request().query('SELECT * FROM Students');
    res.json(result.recordset);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /students/:id: Retrieve a student by ID
app.get('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await poolConnect;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Students WHERE student_id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /students: Create a new student
app.post('/students', async (req, res) => {
  const { name, address } = req.body;
  try {
    await poolConnect;
    const insertResult = await pool.request()
      .input('name', sql.VarChar(100), name)
      .input('address', sql.VarChar(255), address)
      .query(
        `INSERT INTO Students (name, address)
         VALUES (@name, @address);
         SELECT * FROM Students WHERE student_id = SCOPE_IDENTITY();`
      );

    res.status(201).json(insertResult.recordset[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /students/:id: Update an existing student
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    await poolConnect;
    const updateResult = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.VarChar(100), name)
      .input('address', sql.VarChar(255), address)
      .query(
        `UPDATE Students
         SET name = @name, address = @address
         WHERE student_id = @id;
         SELECT * FROM Students WHERE student_id = @id;`
      );

    if (updateResult.recordset.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(updateResult.recordset[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /students/:id: Delete a student
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await poolConnect;
    const deleteResult = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Students WHERE student_id = @id; SELECT @@ROWCOUNT as rowsAffected;');

    if (deleteResult.recordset[0].rowsAffected === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
