const auth=require('../middleware/auth')
const users=require('../models/users')
const posts=require('../models/posts')
const router=require('express').Router()

//Create Quiz
router.post('/publish',auth,async (req,res)=>{
    try{
        const {id}=req.decoded
        const user= await users.findById(id)
        //fields form frontend
        // const quizname=req.body.quizname
        const {Questions,quizname}=req.body
        //create poll
        const post=await posts.create({
            quizname,
            Questions,
            user
        })
        // user.poll.push(poll._id);
        user.posts.push(post._id)
        await user.save()
        res.status(201).json(post)
       // res.status(201).json(Questions)
    }catch(err){
        console.log(err)
    }
})

//GET ALL QUIZ
router.get('/publications',auth,async (req,res)=>{
    try{
         const {id:me}=req.decoded
        //  const {_id}=await users.find({ _id: { $ne:me} })
         const user=await posts.find({ _id: { $ne:me} }).populate('user',['username','pic']).sort({updatedAt:-1}).populate('passed')
         
         res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})
//GET specific user
router.get('/points',auth,async (req,res)=>{
    try{
         const {id}=req.decoded
        //  const {_id}=await users.find({ _id: { $ne:me} })
         const user=await users.findById(id)
         
         res.status(200).json(user.points)

    } catch (error) {
        res.status(500).json(error)
    }
})
//add points
router.post('/contributions',auth,async (req,res)=>{
    const {id:userId}=req.decoded
    const {point,id}=req.body
    try{
    const user=await users.findById(userId)
    const post=await posts.findById(id)

    //validating
    if(post.passed.filter(p=>p.toString()===userId).length>0){
        return res.json({msg:'already passed a quiz'})
    }
    else{
        user.points=user.points+point
        post.passed.push(userId)
    }
    if(post.user.filter(p=>p.toString()===userId).length>0){
        return res.json({msg:'you knew all the answers '})
    }

    //save
    await user.save()
    await post.save()
    res.status(200).json({user,post})
    } catch (error) {
        res.status(500).json(error)
    }
})
//get all users
router.get('/users',auth,async (req,res)=>{
    const {id:me}=req.decoded
    try{
    const user=await users.findById(me).populate('posts')
    const post=await posts.find({passed:$and=me})
      
    res.status(200).json({user,post})
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete posts
router.delete('/delete/:id',auth,async (req,res)=>{
    const {id}=req.params
    try{
    const post=await posts.findByIdAndDelete(id)
    res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports=router