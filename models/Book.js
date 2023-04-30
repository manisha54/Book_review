const mongoose  = require('mongoose')

const reviewScheme = new mongoose.Schema({
    text:{
        type:String,
        required:true,
        minLength:10
    }
})

//remove unnessary

reviewScheme.set('toJSON',{
    transform: (document, returnedDocument) =>{
        returnedDocument.id = document._id.toString()
        delete returnedDocument._id
        
    }

})


//reviews

const bookScheme = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    author : {
        type: String,
        default : 'Anonymous'
    },
    reviews: [reviewScheme]    //use array because of many reviews(list of books)

}, { timestamps: true})



//remore unnessary thing
bookScheme.set('toJSON',{
    transform: (document, returnedDocument) =>{
        returnedDocument.id = document._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__v

    }
})


module.exports = mongoose.model('Book', bookScheme)