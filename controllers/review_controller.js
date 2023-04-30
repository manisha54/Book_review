
const Book = require('../models/Book')


const getAllReview = (req,res,next)=>{
    Book.findById(req.params.book_id)
    .then((book) => {
        if (!book) return res.status(404).json({error: " book not found"})   
        res.json(book.reviews)
    })
    .catch(next)

}



const createReview = (req,res,next)=>{
    Book.findById(req.params.book_id)
    .then((book) => {
        if (!book) return res.status(404).json({error: " book not found"})   
        const review={
            text:req.body.text
        }
        book.reviews.push(review)
        book.save()
        .then((book) => res
            .status(201)
            .json(book.reviews[book.reviews.length-1]))
        .catch(next)
    })
    .catch(next)
}

const deleteAllReview = (req,res,next)=>{
    Book.findById(req.params.book_id)
    .then((book) => {
        if (!book) return res.status(404).json({error: " book not found"})   
        book.reviews =[]
        book.save()
        .then((book) => res.status(204).end())
        .catch(next)
    })
    .catch(next)


}


//---------------------------------------------------------------------------------------------



const getAReview = (req,res,next) =>{
    Book.findById(req.params.book_id)
    .then((book) => {
            if (!book) return res.status(404).json({error: " book not found"})   
        const review = book.reviews.id(req.params.review_id)
            if (!book) return res.status(404).json({error: " review not found"})
            res.json(review) 
        
    })
    .catch(next)

}


const UpdateAReview =   (req,res,next) =>{
    Book.findById(req.params.book_id)
    .then((book) => {
            if (!book) return res.status(404).json({error: " book not found"})   
        book.reviews = book.reviews.map((r) =>{
            if (r.id === req.params.review_id){
                r.text = req.body.text
            }
            return r

        })
        book.save().then(book=> {
            res.json(book.reviews.id(req.params.review_id))
        }).catch(next)
           
    })
    .catch(next)
    
}


const deleteAReview = (req,res,next) =>{
    Book.findById(req.params.book_id)
    .then((book) => {
            if (!book) return res.status(404).json({error: " book not found"})   
        book.reviews = book.reviews.filter((r)=>{
            return r.id !== req.params.review_id
        })  
        book.save()
            .then(book => res.status(204).end())
            .catch(next)
                
                    
    })
    .catch(next)

}


module.exports ={
    getAllReview,
    createReview,
    deleteAllReview,
    getAReview,
    UpdateAReview,
    deleteAReview
}