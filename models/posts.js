const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    Questions:[{
        question:String,
        optionA:String,
        optionB:String,
        optionC:String,
        optionD:String,
        answer:String,
    }],
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    passed:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    quizname:{
        type:String,
        unique:true
    },
},
{timestamps:true})

module.exports=mongoose.model('posts',PostSchema)