import { Router } from 'express';
import Post from '../models/Post';

const router = Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});
