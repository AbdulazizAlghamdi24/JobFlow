const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();


app.use(express.json()); 
app.use(cors()); 


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "jobs"
});


app.get('/', (req, res) => {
  res.json({ message: "Server is up and running!" });
});


app.get('/jobs', (req, res) => {
  const sql = "SELECT * FROM jobs";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
});


app.post('/jobs', (req, res) => {
  const { title, description, salary, imageUrl } = req.body;
  const sql = "INSERT INTO jobs (title, description, salary, imageUrl) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, salary, imageUrl], (err, result) => {
    if (err) {
      console.error("Error creating new job:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "New job added", jobId: result.insertId });
  });
});


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
