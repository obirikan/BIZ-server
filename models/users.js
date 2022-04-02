const mongoose=require('mongoose')


const UsersSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
    },
    points:{
        type:Number,
        default: 0
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    }],
},
{timestamps:true})

module.exports=mongoose.model('users',UsersSchema)