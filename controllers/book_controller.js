
const Book = require('../models/Book')


const getAllBooks = (req, res, next) =>{
    Book.find()
    .then(books => res.json(books))
    .catch(next)
}

const createBook = (req, res, next) =>{
    Book.create(req.body)
    .then((book) => res.status(201).json(book))
    .catch(err => next(err))
}

const deleteAllBooks = (req, res, next) =>{
    Book.deleteMany()
    .then(reply => res.json(reply))
    .catch(next)
}

//.................................................................................
const getABook  =(req, res,next) => {
    Book.findById(req.params.book_id)
        .then((book) => {
            if(!book){
                let err = new Error('Book not found')
                err.status(404).json({error:'book not found'})
            }  
            res.json(book)  
        })
        .catch(next)
}

const updateAbook = (req, res,next) =>{
    Book.findByIdAndUpdate(
        req.params.book_id,
        { $set: req.book},
        {new : true}    //retun old documment

    ).then(updated => res.json(updated))
     .catch(next)

}


const delteAbook = (req, res,next) =>{
    
    Book.findByIdAndDelete(req.params.book_id)
        .then(reply => res.status(204).end())
        .catch(next)
}





module.exports ={
    getAllBooks,
    createBook,
    deleteAllBooks, 
    getABook,
    updateAbook,
    delteAbook
}