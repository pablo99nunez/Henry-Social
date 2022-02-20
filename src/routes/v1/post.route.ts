const express = require('express');
const router = express.Router()

router.post("/", (req: any, res: any)=>{
  return res.json("Post agregado");
})

router.delete("/", (req: any, res: any)=>{})
