import { Router } from "express";
import User from "../models/User";

const router = Router()


router.post("/user",(req,res)=>{
    const {name,username,email,avatar,createAt} = req.body
    User.create({name,username,email,avatar,createAt}).then(result=>{
        res.status(201).json(result)
    }).catch(e=>res.status(400).json({error:e}))
})

router.get("/user",(req,res)=>{
    const {query} = req.body
    User.findOne(query).then(e=>{
        res.json(e)
    }).catch(e=>{
        res.status(400).send(e)
    })
   
})

export default router