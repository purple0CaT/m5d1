import express from 'express'
import booksRouter from './services/books/index.js';
import studentsRouter from './services/students/index.js';

const server = express();
const port = 3003;

// ==== ROUTES / ENDPOINTS ====
server.use("/students", studentsRouter)
server.use("/books", booksRouter)

server.listen(port, ()=>{
    console.log('Hello', port)

})   