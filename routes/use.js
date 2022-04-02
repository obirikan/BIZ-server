const users=require('../models/users.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { exists } = require('../models/users.js')
const router=require('express').Router()
//Register
router.post('/register',async (req,res)=>{
    try {
         //generate new password
         const salt=await bcrypt.genSalt(10)
         const hashedPassword=await bcrypt.hash(req.body.password,salt)
         //create user
         const newUser=new users({
             username:req.body.username.toLowerCase(),
             email:req.body.email,
             password:hashedPassword,
         })
         //save user and send response
         const user=await newUser.save()
        //using jwt
         const {username,id}=user
         const token=jwt.sign({username,id},process.env.SECRET) 
         
            res.status(200).json({token,username})
         
         const a=await users.findOne({user})
         if(!user){
            res.status(200).json('username already exist')
         }
        } catch (error) {
           res.status(500).json('username already exist')
        }
 
})
       //login
       router.post('/login',async (req,res)=>{
        try{
           //find user
           const user=await users.findOne({username:req.body.username})
           const {id,username}=user
           !user && res.status(400).json('wrong username or password')
           //validate user
           const valid=await bcrypt.compare(req.body.password,user.password)
           //send response
            if(valid){      
                const token=jwt.sign({id,username},process.env.SECRET )
                res.json({id,username,token})
                }else{
                res.status(400).json('wrong username or password')
                }
        }catch(err){
            res.status(500).json(err)
        }
       })
module.exports=router