import { Router } from "express";
import { Model } from "mongoose";
import Post from "../models/Post";

const router = Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

router.post("/post", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

router.delete("/post", async (req, res) => {
  try {
    const { _id } = req.body;
    let result = await Post.findOneAndDelete({ _id });
    if (result === null) throw new Error("No se encontro el post");
    res.send(result);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

export default router

