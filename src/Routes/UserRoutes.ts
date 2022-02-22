/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import axios from "axios";
import User from "../models/User";
import { userValidate } from "../models/User";
const router = Router();

router.post("/user", (req, res) => {
  User.create(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((e) => res.status(400).json({ error: e }));
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

router.post("/findUser", (req, res) => {
  const query = req.body;
  User.findOne(query)
    .then((e) => {
      res.json(e);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.post("/admin", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      user.admin = !user.admin;
      console.log(user.admin);
      await user.save();
      res.json(user);
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

async function isFollowing(userA: string, userB: string) {
  try {
    const isFollowing = await User.findOne({
      username: userA,
      following: { $in: userB },
    });
    if (isFollowing) return true;
  } catch (e) {
    return "Fallo al buscar el usuario: " + userA + e;
  }
  return false;
}

async function addFollower(seguido: string, seguidor: string) {
  const userA = await User.updateOne(
    { username: seguido },
    {
      $addToSet: {
        followers: seguidor,
      },
    },
    { returnOriginal: false }
  );
  const userB = await User.updateOne(
    { username: seguidor },
    {
      $addToSet: {
        following: seguido,
      },
    },
    { returnOriginal: false }
  );
  return { userA, userB };
}

router.post("/follow", async (req, res) => {
  const { seguidor, seguido } = req.body;
  try {
    if (await isFollowing(seguidor, seguido)) {
      //Si el seguidor ya sigue al seguido
      await axios.post("/unfollow", {
        seguido,
        seguidor,
      }); //Deja de seguir al usuario
      const userSeguidor = await axios
        .post("/findUser", {
          username: seguidor,
        })
        .then((e: any) => e.data);
      const userSeguido = await axios
        .post("/findUser", {
          username: seguido,
        })
        .then((e: any) => e.data);
      res.json({ userSeguidor, userSeguido });
    } else {
      try {
        await addFollower(seguido, seguidor);
        const userSeguidor = await axios
          .post("/findUser", {
            username: seguidor,
          })
          .then((e: any) => e.data)
          .catch((e) => {
            throw new Error(e);
          });
        const userSeguido = await axios
          .post("/findUser", {
            username: seguido,
          })
          .then((e: any) => e.data)
          .catch((e) => {
            throw new Error(e);
          });

        res.status(200).json({ userSeguidor, userSeguido });
      } catch (e) {
        res.status(401).json({ error: e });
      }
    }
  } catch (error) {
    res.status(403).json({ error: error });
  }
});

router.post("/unfollow", async (req, res) => {
  const { seguido, seguidor } = req.body;
  try {
    const resultA = await User.updateOne(
      { username: seguido },
      {
        $pull: {
          followers: { $in: [seguidor] },
        },
      }
    );
    const resultB = await User.updateOne(
      { username: seguidor },
      {
        $pull: {
          following: { $in: [seguido] },
        },
      }
    );
    res.json({ resultA, resultB });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get("/PELIGRO", async (req, res) => {
  await User.deleteMany({});

  res.json("DB Clean");
});

export default router;
