const express = require('express')
const router = express.Router()

const bookController = require('../controllers/book_controller')

const reviewController = require('../controllers/review_controller')

//only admin can able to post/create book
const { verifyAdmin } = require('../middlewares/auth')


router.route('/')
    .get(bookController.getAllBooks)
    .post(verifyAdmin,bookController.createBook)

    .put((req,res) =>{
        res.status(405).json({error: "PUT request is not allowed"})
    })

    .delete(bookController.deleteAllBooks)




router.route('/:book_id')
    .get(bookController.getABook)

    .post((req, res) =>{
        res.status(405).json({error: "POST request is not allowed"})

    })

    .put(bookController.updateAbook)
    .delete(bookController.delteAbook)


   //reviews

    router.route('/:book_id/reviews')
    .get(reviewController.getAllReview)

    .post(reviewController.createReview)  

    .put((req,res) =>{
        res.status(405).json({error: "PUT request is not allowed"})
    })


    .delete(reviewController.deleteAllReview)



    //--------------------------------------------------------------------------------------------------------
    router.route('/:book_id/reviews/:review_id')
    .get(reviewController.getAReview)
    .put(reviewController.UpdateAReview)
    .delete(reviewController.deleteAReview)

    


module.exports = router




















