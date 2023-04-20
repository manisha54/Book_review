const express = require('express')
const Book = require('../models/Book')

const router = express.Router()

router.route('/')
    .get(async(req, res) =>{
        // //res.json(books)
        // Book.find()
        //     .then(books => res.json(books))
        //     .catch(err => res.log(err))

        try{
            const books = await Book.find()
            res.jsons(books)

        }catch(error){
            console.log(err)
        }

    })
    .post((req,res)=>{
            if(!req.body.title){                       // provide error message 
                return res.status(400).json({error: "title is missing"})
            }
            const book = {
                id : books.length+1,                 //add a book with title and author name to the previous list of book
                title: req.body.title,
                author: req.body.author || 'Anonymous'
            }
            books.push(book)
            res.status(201).json(book)
    })

    .put((req,res) =>{
        res.status(405).json({error: "PUT request is not allowed"})
    })

    .delete((res, req) =>{
        res.json({})
    })




router.route('/:book_id')
    .get((req, res) =>{
        const book_id = Number(req.params.book_id)
        const book= books.find((b) =>b.id ===book_id)
        res.json(book)

    })

    .post((req, res) =>{
        res.status(405).json({error: "POST request is not allowed"})

    })

    .put((req, res) =>{
        const updated_books = books.map((b)=>{
        if(b.id == req.params.book_id){
            b.title = req.body.title
            b.author = req.body.author
        }
        return b
        })
        res.json(updated_books)

        })


    .delete((req, res) =>{
        const updated_books = books.filter((b) => {
        if (b.id !=req.params.book_id) return b
        })
        res.json(updated_books)
    })


module.exports = router






















// //get request
// app.get('/api/books', (req, res) =>{
//     res.json(books)
// })

// // app.get('/api/books/:book_id', (req, res) =>{
// //     res.json(req.params)
// // })


// //only 1 book

// // app.get('/api/books/:book_id', (req, res) =>{
// //     console.log(req.params)
// //     const book= books.find((b) =>b.id ==req.params.book_id)
// //     res.json(book)
// // })



// //get request for perticular book
// app.get('/api/books/:book_id', (req, res) =>{
//     const book_id = Number(req.params.book_id)
//     const book= books.find((b) =>b.id ===book_id)
//     res.json(book)
// })

// //post request to create/add list of books

// //books-list of book
// //book ---single book

// app.post('/api/books',(req,res) =>{
//     if(!req.body.title){                       // provide error message 
//         return res.status(400).json({error: "title is missing"})
//     }
//     const book = {
//         id : books.length+1,                 //add a book with title and author name to the previous list of book
//         title: req.body.title,
//         author: req.body.author || 'Anonymous'
//     }
//     books.push(book)
//     res.status(201).json(book)
    
// })


// //put/update 
// app.put('/api/books/:book_id',(req,res) =>{
//     const updated_books = books.map((b)=>{
//         if(b.id == req.params.book_id){
//             b.title = req.body.title
//             b.author = req.body.author
//         }
//         return b
//     })
//     res.json(updated_books)

// })



// //delete
// app.delete('/api/books/:book_id',(req,res) =>{
//     const updated_books = books.filter((b) => {
//         if (b.id !=req.params.book_id) return b
//     })
//     res.json(updated_books)

// })