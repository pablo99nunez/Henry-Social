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

router.post('/findUser', (req, res) => {
  const query = req.body;
  console.log(query);
  User.findOne(query)
    .then((e) => {
      console.log(e);
      res.json(e);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

export default router;
