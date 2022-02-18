import { Router } from 'express';
import { Model } from 'mongoose';
// import Post from '../models/Post';

const router = Router();
let Post: Model<''>;

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

router.post('/post', async (req, res) => {
  try {
    let post = await Post.create(req.body);
    res.json(post);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});
router.delete('/post', async (req, res) => {
  try {
    const { _id } = req.body;
    let post = await Post.deleteOne({ _id });
    res.json;
  } catch (e) {
    res.status(401).json({ error: e });
  }
});