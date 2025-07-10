import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from "fs/promises";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di : http://localhost:${PORT}`);
})

const getJsonData = async () => {
  fs.readFile('./src/data/books.json', "utf-8")
    .then(async (data) => {
      const booksData = await JSON.parse(data)

      const books = booksData.books
      const bookStats = booksData.bookStats
      const weeklyLoan = booksData.weeklyLoan

      app.get('/books', (req, res) => {
        res.json(books);
      })

      app.get('/books/stats', (req, res) => {
        res.json(bookStats);
      })

      app.get('/books/loans', (req, res) => {
        res.json(weeklyLoan);
      })

      app.delete('/books/loans/:id', (req, res) => {
        const id = parseInt(req.params.id);
        weeklyLoan = weeklyLoan.map(book => book.id !== id);
        res.status(204).send();
      })


      app.post('/books', (req, res) => {
        const newBook = req.body;
        books.push(newBook);
        res.status(201).json(newBook);
      });

      app.put('/books/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const updateBook = req.body;
        books = books.map(book => book.id === id ? updateBook : book);
        res.json(updateBook);
      });

      app.delete('/books/:id', (req, res) => {
        const id = parseInt(req.params.id);
        books = books.filter(book => book.id !== id);
        res.status(204).send();
      });

      app.get('/weather/:city', async (req, res) => {
        const city = req.params.city;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
          const response = await axios.get(url);
          res.json(response.data);
        } catch (error) {
          res.status(500).json({
            error: 'Gagal mengambil data cuaca'
          })
        }

      })
    })
    .catch(error => {
      console.error('Error fetching JSON Data! error : ', error)
    })
}

getJsonData()