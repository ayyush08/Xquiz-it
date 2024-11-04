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
    attemptedBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
        
},{
    timestamps:true
})

export const Question = mongoose.model('Question',questionSchema);