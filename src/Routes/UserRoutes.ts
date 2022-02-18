import { Router } from 'express';
const axios = require("axios");
import User from '../models/User';

const router = Router();

router.post('/user', (req, res) => {
  console.log(req.body);
  const { name, username, email, avatar, createAt } = req.body;
  User.create({ name, username, email, avatar, createAt })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((e) => res.status(400).json({ error: e }));
});
router.get('/users', async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});
router.post('/findUser', (req, res) => {
  const query = req.body;
  User.findOne(query)
    .then((e) => {
      res.json(e);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});


async function isFollowing(userA:string,userB:string){
  const isFollowing=await User.findOne({
    username:userA,
    following: {$in: [userB]}
  })
  if(!isFollowing) return true;
  return false;
}

router.post('/follow',async (req,res)=> {
  const { seguidor,seguido } = req.body;
  try {
     if(await isFollowing(seguidor,seguido)){ //Si el seguidor ya sigue al seguido
      const result = await axios.post("/unfollow",{seguido,seguidor}) //Deja de seguir al usuario
    }else{
      const userSeguidor=await axios.post("/findUser",{username:seguidor})
      const userSeguido=await axios.post("/findUser",{username:seguido})
      userSeguidor.following.push(userSeguido)
      userSeguido.followers.push(userSeguidor)
    }
  } catch (error) {
      res.status(400).json({error:error})
  }
})

router.post("/unfollow",async (req,res)=>{ 
  const {seguido,seguidor}= req.body;
  try {
    const unfollow = User.updateMany({},
    {
      $pull:{
          followers: {
              $in: seguido
          }
      }
    }   
    )
  } catch (error) {
    res.status(400).json({error:error})
  }
})

export default router;
