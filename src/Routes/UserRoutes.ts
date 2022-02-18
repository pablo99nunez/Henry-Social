import { Router } from 'express';
import User, { IUser } from '../models/User';

const router = Router();

router.post('/user', (req, res) => {
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

export default router;
