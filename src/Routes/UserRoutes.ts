/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import axios from "axios";
import User from "../models/User";
import { INotification, NotificationType } from "../models/User";
import { Comment } from "../models/Post";
import Post from "../models/Post";
import { auth } from "../services/firebase/firebase";

const router = Router();

router.post("/user", (req, res) => {
  User.findOne({ username: req.body.username }).then((e) => {
    if (!e) {
      User.create(req.body)
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((e) => res.status(400).json({ error: e }));
    } else res.status(404).json({ error: "" });
  });
});

router.put("/user", async (req, res) => {
  try {
    const { _id: userId, changes } = req.body;
    const usernames = await User.find({ _id: { $ne: userId } }).then((r) =>
      r.map((u) => u.username)
    );
    console.log(changes);
    if (usernames.includes(changes.username)) return res.sendStatus(304);
    const user = await User.findByIdAndUpdate(userId, changes, { new: true });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/users", async (req, res) => {
  const { username } = req.query;
  try {
    if (username) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      username.toLowerCase();
      const users = await User.find({
        name: { $regex: username, $options:"i" },

      });
      return res.json(users);
    }
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

router.get("/user", async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ username });
  res.status(200).json(user);
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
      // Si el seguidor ya sigue al seguido
      await axios.post("/unfollow", {
        seguido,
        seguidor,
      }); // Deja de seguir al usuario
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
        await axios.post("/notification", {
          type: NotificationType.Follow,
          emisor: userSeguidor,
          receptor: userSeguido,
          link: "/profile/" + userSeguidor.username,
        });
        res.status(200).json({ userSeguidor, userSeguido });
      } catch (e) {
        res.status(401).json({ error: e });
      }
    }
  } catch (error) {
    res.status(403).json({ error });
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
    res.status(400).json({ error });
  }
});

router.put("/notification", async (req, res) => {
  const { id, userId } = req.body;
  const user = await User.findById(userId);
  if (user) {
    user.notifications[id].new = false;
    user.markModified("notifications");
    await user.save().then((user) => {
      res.json(user);
    });
  } else {
    res.status(400).send("User not found");
  }
});

router.post("/notification", async (req, res) => {
  let notification: INotification = req.body;
  try {
    const receptor = await User.findById(notification.receptor);
    const emisor = await User.findById(notification.emisor);
    if (receptor && emisor) {
      if (
        typeof receptor.username === "string" &&
        typeof emisor.username === "string" &&
        typeof emisor.avatar === "string"
      )
        switch (notification.type) {
          case NotificationType.Follow:
            {
              notification = {
                content: `${emisor.name} ha comenzado a seguirte`,
                type: notification.type,
                link: notification.link,
                emisor: emisor.username,
                avatar: emisor.avatar,
                new: true,
              };
            }
            break;
          case NotificationType.Like:
            {
              notification = {
                content: `${emisor.name} le ha dado like a tu publicación`,
                link: notification.link,
                type: notification.type,
                emisor: emisor.username,
                avatar: emisor.avatar,
                new: true,
              };
            }
            break;
          case NotificationType.Comment:
            {
              notification = {
                content: `${emisor.name} ha comentado tu publicación`,
                link: notification.link,
                type: notification.type,
                emisor: emisor.username,
                avatar: emisor.avatar,
                new: true,
              };
            }
            break;
          case NotificationType.CommentLike:
            {
              notification = {
                content: `${emisor.name} le ha dado like a tu comentario`,
                link: notification.link,
                type: notification.type,
                emisor: emisor.username,
                avatar: emisor.avatar,
                new: true,
              };
            }
            break;
        }
      await User.findByIdAndUpdate(
        receptor._id,
        {
          $addToSet: {
            notifications: notification,
          },
        },
        { new: true }
      )
        .then((e) => {
          res.json(e);
        })
        .catch((e) => {
          throw new Error(e);
        });
    } else {
      throw new Error("No se encontraron los usuarios");
    }
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

router.get("/PELIGRO", async (req, res) => {
  await User.deleteMany({});

  res.json("DB Clean");
});

router.get("/deleteNotis", async (req, res) => {
  await User.updateMany(
    {},
    {
      notifications: [],
    }
  );
  res.send("Notificaciones eliminadas");
});

router.delete("/delete-user", async (req, res) => {
  const { userId, adminId, uid } = req.body;

  try {
    const adminUser = await User.findById(adminId);
    if (!adminUser?.admin && userId !== adminId)
      return res.status(403).send("Only for admins users.");

    const user: any = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).send("This user wasn't found.");

    // Elimina todos los seguidores y seguidos
    await User.updateMany(
      {},
      { $pull: { followers: user.username, following: user.username } }
    );
    // Busca todos los post con X author
    const postUser = await Post.find({ author: userId });
    // Guarda en un array todos los id de esos post con X author
    const postIdByUser = postUser.map((post) => post._id);
    // Elimina los Post de X author
    await Post.deleteMany({ author: userId });
    // Elimina los comentarios de X author
    await Comment.deleteMany({ author: userId });
    // Elimina los likes de X autor
    // Por cada id busca y elimina en el modelo Comment,
    // comentarios hechos en post con el postId del author ya eliminado.
    for (const id of postIdByUser) {
      await Comment.deleteMany({ postId: id });
    }

    await auth.deleteUser(uid);
    res.send(user);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

export default router;
