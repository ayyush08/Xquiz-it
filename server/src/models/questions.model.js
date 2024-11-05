import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    options:{
        type:Map,
        of:String,
        required:true
    },
    correctAnswers: {
        type: Map,
        of: Boolean,
        required: true
    },
    userAnswers: {
        type: Map,
        of: Boolean,
        required: true
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