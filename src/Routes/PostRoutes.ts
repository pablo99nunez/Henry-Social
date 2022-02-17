import { Router } from 'express';
import { Model } from 'mongoose';
import Post from '../models/Post';

const router = Router();
// let Post:Model<''>

router.get('/posts', async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

router.post('/post', async (req, res) => {
  let post = await Post.create(req.body);
  res.json(post);
});
