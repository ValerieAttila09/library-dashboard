import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

dotenv.config()

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

db.connect(err => {
  if (err) {
    console.error("Koneksi gagal! Error : \n", err)
  } else {
    console.log("Terkoneksi ke MySQL!")
  }
})

export const db_users = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_USERS_NAME
})

db_users.connect((err) => {
  if (err) throw err
  console.log("Terhubung ke MySQL!")
})

app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.json(results)
  })
})

app.post('/users', (req, res) => {
  const { firstName, lastName, username, email, role, country, street, city, state, postal } = req.body
  db.query("INSERT INTO users (firstName, lastName, username, email, role, country, street, city, state, postal, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?, 1)", [firstName, lastName, username, email, role, country, street, city, state, postal], (err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json({
      message: "User berhasil di tambahkan"
    })
  })
})

app.put('/users/:id', (req, res) => {
  const { firstName, lastName, username, email, role, country, street, city, state, postal } = req.body
  const { id } = req.params
  db.query('UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ?, role = ?, country = ?, street = ?, city = ?, state = ?, postal = ? WHERE id = ?', [firstName, lastName, username, email, role, country, street, city, state, postal, id], (err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json({
      message: "User berhasil di update"
    })
  })
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json({
      message: "User berhasil di delete"
    })
  })
})

app.get('/books', (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json(result)
  })
})

app.post('/books', (req, res) => {
  const { book_id, title, price, author_firstname, author_lastname, author_email } = req.body
  db.query("INSERT INTO books (book_id, title, price, author_firstname, author_lastname, author_email, status) VALUES (?, ?, ?, ?, ?, ?, 1)", [book_id, title, price, author_firstname, author_lastname, author_email], (err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json({
      message: "Buku berhasil di tambahkan"
    })
  })
})

app.put('/books/:id', (req, res) => {
  const { book_id, title, price, author_firstname, author_lastname, author_email } = req.body
  const { id } = req.params
  db.query('UPDATE books SET book_id = ?, title = ?, price = ?, author_firstname = ?, author_lastname = ?, author_email = ? WHERE id = ?', [book_id, title, price, author_firstname, author_lastname, author_email, id], (err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json({
      message: "Buku berhasil di update"
    })
  })
})

app.delete('/books/:id', (req, res) => {
  const { id } = req.params
  db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json({
      message: "Buku berhasil di delete"
    })
  })
})

app.get('/borrower', (req, res) => {
  db.query("SELECT * FROM borrowings", (err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json(result)
  })
})

app.post('/borrower', (req, res) => {
  const { borrower, borrower_email, book_title, book_author, count, total_price, company, address, city, country, postal, deadline } = req.body
  db.query(
    "INSERT INTO borrowings (borrower, borrower_email, book_title, book_author, count, total_price, company, address, city, country, postal, deadline, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [borrower, borrower_email, book_title, book_author, count, total_price, company, address, city, country, postal, deadline, 1],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }
      res.json({
        message: "Peminjaman berhasil di tambahkan"
      })
    }
  )
})

app.put('/borrower/:id', (req, res) => {
  const { borrower, borrower_email, book_title, book_author, count, total_price, company, address, city, country, postal, deadline } = req.body
  const { id } = req.params
  db.query('UPDATE borrowings SET borrower = ?, borrower_email = ?, book_title = ?, book_author = ?, count = ?, total_price = ? company = ?, address = ?, city = ?, country = ?, postal = ?, deadline = ? WHERE id = ?', [borrower, borrower_email, book_title, book_author, count, total_price, company, address, city, country, postal, deadline, id], (err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json({
      message: "Peminjaman berhasil di update"
    })
  })
})

app.delete('/borrower/:id', (req, res) => {
  const { id } = req.params
  db.query("DELETE FROM borrowings WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json({
      message: "Peminjaman berhasil di delete"
    })
  })
})

// REGISTER
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  db_users.query(
    'INSERT INTO tb_users (email, password, name) VALUES (?, ?, ?)',
    [email, hashedPassword, name],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Gagal daftar', error: err })
      res.json({ message: 'Registrasi berhasil!' })
    }
  )
})

// LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body

  db_users.query('SELECT * FROM tb_users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Query error' })
    if (results.length === 0) return res.status(401).json({ message: 'User tidak ditemukan' })

    const user = results[0]
    const match = await bcrypt.compare(password, user.password)

    if (!match) return res.status(401).json({ message: 'Password salah' })

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      'RAHASIA_SECRET',
      { expiresIn: '1h' }
    )

    res.json({ token })
  })
})

// PROTECTED ROUTE
app.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).json({ message: 'Token diperlukan' })

  const token = authHeader.split(' ')[1]

  jwt.verify(token, 'RAHASIA_SECRET', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token tidak valid' })

    res.json({ message: 'Akses diterima!', user: decoded })
  })
})

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`)
})