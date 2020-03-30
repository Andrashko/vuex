import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    authors:[String],
    isbn:String,
    published:{
        type: Date,
        max: Date.now()
    },
    pages:{
        type:Number,
        min:1,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    price:{
        type:Number,
        min:0
    }

});

const Book = mongoose.model("Book", bookSchema);

export default Book;