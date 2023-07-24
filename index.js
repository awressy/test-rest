const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Contoh data
let books = [
  { id: 1, title: 'Book 1' },
  { id: 2, title: 'Book 2' },
];

// Mendapatkan semua buku
app.get('/books', (req, res) => {
  res.json(books);
});

// Mendapatkan buku berdasarkan ID
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    res.json(book);
  }
});

// Menambahkan buku baru
app.post('/books', (req, res) => {
  const { title } = req.body;
  const id = books.length + 1;
  const newBook = { id, title };
  books.push(newBook);

  res.status(201).json(newBook);
});

// Menghapus buku berdasarkan ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter((book) => book.id !== id);

  res.sendStatus(204);
});

// Mengubah judul buku berdasarkan ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  const book = books.find((book) => book.id === id);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    book.title = title;
    res.json(book);
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});