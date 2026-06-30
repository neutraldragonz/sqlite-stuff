const express = require("express");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("mydatabase.db");

app.use(express.json());
app.use(express.static("public"));

db.exec(`
  CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT NOT NULL
  );
`);

app.get("/data", (req, res) => {
  const rows = db.prepare("SELECT * FROM data").all();
  res.json(rows);
});

app.post("/data", (req, res) => {
  const { firstName, lastName, location, image } = req.body;

  const stmt = db.prepare(`
    INSERT INTO data (firstName, lastName, location, image)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(firstName, lastName, location, image);

  res.json({
    success: true,
    id: result.lastInsertRowid
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});