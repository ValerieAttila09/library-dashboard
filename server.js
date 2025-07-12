import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("Koneksi gagal! Error : \n", err);
  } else {
    console.log("Terkoneksi ke MySQL!");
  }
})

app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  })
})

app.post('/users', (req, res) => {
  const { firstName, lastName, username, email, role, country, street, city, state, postal } = req.body;
  db.query("INSERT INTO users (firstName, lastName, username, email, role, country, street, city, state, postal, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?, 1)", [firstName, lastName, username, email, role, country, street, city, state, postal], (err, result) => {
    if(err) {
      return res.json(err);
    } 
    res.json({
      message: "User berhasil di tambahkan"
    });
  })
})

app.put('/users/:id', (req, res) => {
  const { firstName, lastName, username, email, role, country, street, city, state, postal } = req.body;
  const { id } = req.params;
  db.query('UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ?, role = ?, country = ?, street = ?, city = ?, state = ?, postal = ? WHERE id = ?', [firstName, lastName, username, email, role, country, street, city, state, postal, id], (err, result) => {
    if(err) {
      return res.json(err)
    }
    res.json({
      message: "User berhasil di update"
    })
  })
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if(err){
      return res.json(err)
    }
    res.json({
      message: "User berhasil di delete"
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});