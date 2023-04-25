const express = require('express')
const Book = require('../models/Book')

const router = express.Router()

router.route('/')
    .get(async(req, res,next) =>{
        
        Book.find()
            .then(books => res.json(books))
            .catch(next)

    })
    .post((req,res,next)=>{         //insert particular book or add a new book
        Book.create(req.body)
        .then((book) => res.status(201).json(book))
        .catch(next)
            
    })

    .put((req,res) =>{
        res.status(405).json({error: "PUT request is not allowed"})
    })

    .delete((res, req,next) =>{ 
        Book.deleteMany()
        .then(reply => res.json(reply))
        .catch(next)
    })




router.route('/:book_id')
    .get((req, res,next) => {
        Book.findById(req.params.book_id)
            .then((book) => {
                if(!book){
                    let err = new Error('Book not found')
                    err.status(404).json({error:'book not found'})
                }    
            })
            .catch(next)
    })

    .post((req, res) =>{
        res.status(405).json({error: "POST request is not allowed"})

    })

    .put((req, res,next) =>{
        Book.findByIdAndUpdate(
            req.params.book_id,
            { $set: req.book},
            {new : true}    //retun old documment

        ).then(updated => res.json(updated))
         .catch(next)

    })


    .delete((req, res,next) =>{
        // const updated_books = books.filter((b) => {
        // if (b.id !=req.params.book_id) return b
        // })
        // res.json(updated_books)

        Book.findByIdAndDelete(req.params.book_id)
            .then(reply => res.status(204).end())
            .catch(next)
    })


module.exports = router




















