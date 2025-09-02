import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // change if needed
  password: "",        // your MySQL password
  database: "storedb", // the DB we created earlier
});

// Test connection
db.connect(err => {
  if (err) {
    console.error("❌ DB Connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// ---------------- CRUD ROUTES ----------------

// Read all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Read single product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(results[0]);
  });
});

// Create new product
app.post("/products", (req, res) => {
  const { id, name, category, quantity, price, image } = req.body;
  const sql = "INSERT INTO products (id, name, category, quantity, price, image) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, name, category, quantity, price, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product added", id: result.insertId });
  });
});

// Update product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price, image } = req.body;
  const sql = "UPDATE products SET name=?, category=?, quantity=?, price=?, image=? WHERE id=?";
  db.query(sql, [name, category, quantity, price, image, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product updated" });
  });
});

// Delete product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted" });
  });
});

// ---------------- SERVER ----------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
