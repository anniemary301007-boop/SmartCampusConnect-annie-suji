// server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt"); // for password hashing

const app = express();

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection (Supabase)
const pool = new Pool({
  connectionString: "postgresql://postgres:Annie%402026Smart@db.qdztgcoubtehegsnljek.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

// Test route
app.get("/", (req, res) => {
  res.send("Smart Campus Backend Running");
});

// ----------------- REGISTER -----------------
app.post("/register", async (req, res) => {
  const { name, email, password,regNo } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users(name,email,password,role,regNo) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [name, email, hashedPassword, "student",regNo]
    );
    const { password: pw, ...safeUser } = result.rows[0];
    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// ----------------- LOGIN -----------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const user = result.rows[0];

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Successful login
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// ----------------- CREATE ANNOUNCEMENT -----------------
app.post("/announcement", async (req, res) => {
  const { title, message } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO announcements(title,message) VALUES($1,$2) RETURNING *",
      [title, message]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// ----------------- GET ANNOUNCEMENTS -----------------
app.get("/announcements", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM announcements ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// ----------------- START SERVER -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
