import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answers:{
        type:[String],
        required:true
    },
    correctAnswers:{
        type:[String],
        required:true
    },
    explanation:{
        type:String,
        required:true
    },
    multipleCorrectAnswers:{
        type:Boolean,
        required:true,
        default:false
    },
        
},{
    timestamps:true
})

const Question = mongoose.model('Question',questionSchema);