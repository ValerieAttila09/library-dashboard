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
      console.log("Step : 1 \t\t\t [Successed!]")
      const booksData = await JSON.parse(data)
      console.log("Step : 2 \t\t\t [Successed!]")

      const books = booksData.books
      const bookStats = booksData.bookStats
      const weeklyLoan = booksData.weeklyLoan
      console.log("Step : 2 \t\t\t [Successed!]")

      app.get('/books', (req, res) => {
        res.json(books);
      })
      console.log("Step : 3 \t\t\t [Successed!]")

      app.get('/books/stats', (req, res) => {
        res.json(bookStats);
      })
      console.log("Step : 4 \t\t\t [Successed!]")

      app.get('/books/loans', (req, res) => {
        res.json(weeklyLoan);
      })
      console.log("Step : 5 \t\t\t [Successed!]")

      app.delete('/books/loans/:id', (req, res) => {
        const id = parseInt(req.params.id);
        weeklyLoan = weeklyLoan.map(book => book.id !== id);
        res.status(204).send();
      })
      console.log("Step : 6 \t\t\t [Successed!]")


      app.post('/books', (req, res) => {
        const newBook = req.body;
        books.push(newBook);
        res.status(201).json(newBook);
      });
      console.log("Step : 7 \t\t\t [Successed!]")

      app.put('/books/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const updateBook = req.body;
        books = books.map(book => book.id === id ? updateBook : book);
        res.json(updateBook);
      });
      console.log("Step : 8 \t\t\t [Successed!]")

      app.delete('/books/:id', (req, res) => {
        const id = parseInt(req.params.id);
        books = books.filter(book => book.id !== id);
        res.status(204).send();
      });
      console.log("Step : 9 \t\t\t [Successed!]")
      console.log("Main Step Started Successfuly!")

      app.get('/weather/:city', async (req, res) => {
        const city = req.params.city;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        console.log("Step : 10 \t\t\t [successed]")

        try {
          const response = await axios.get(url);
          console.log("Step : 12 \t\t\t [successed]")
          res.json(response.data);
          console.log("Step : 13 \t\t\t [successed]")
        } catch (error) {
          res.status(500).json({
            error: 'Gagal mengambil data cuaca'
          })
        }
        console.log("Step : 14 \t\t\t [successed]")
      })
    })
    .catch(error => {
      console.error('Error fetching JSON Data! error : ', error)
    })
}

getJsonData()
console.log("Last Step [successed]")