import { Router } from "express";
import Post, { Comment } from "../models/Post";
import { NotificationType } from "../models/User";
import axios from "axios";

const router = Router();

router.post("/posts", async (req, res) => {
  try {
    const { _id, liked } = req.body;
    console.log(_id);
    const posts = _id
      ? await Post.find({
          author: {
            _id,
          },
        }).populate("author", "name avatar username")
      : liked
      ? await Post.find({
          nLikes: {
            _id: liked,
          },
        }).populate("author", "name avatar username")
      : await Post.find({}).populate("author", "name avatar username");

    res.json(posts);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    res.json(post);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});
router.post("/like", async (req, res) => {
  try {
    const { _id, author } = req.body;
    const post = await Post.findById(_id).catch((e) => {
      throw new Error(e);
    });
    console.log(post?.nLikes.includes(author._id));
    const isLikedAlready = post?.nLikes.includes(author._id);

    if (!isLikedAlready) {
      console.log("Liking");
      const result = await Post.findByIdAndUpdate(
        _id,
        {
          $addToSet: { nLikes: author },
        },
        { new: true }
      )
        .populate("author", "name username avatar")
        .catch((e) => {
          throw new Error(e);
        });
      axios
        .post("/notification", {
          type: NotificationType.Like,
          receptor: result?.author._id,
          emisor: author._id,
          link: "/post/" + _id,
        })
        .catch((e) => {
          throw new Error(e);
        });
      res.json(result);
    } else {
      console.log("Disliking");
      const result = await Post.findByIdAndUpdate(
        _id,
        {
          $pull: {
            nLikes: { $in: [author] },
          },
        },
        { new: true }
      )
        .populate("author", "name username avatar")
        .catch((e) => {
          console.log(e);
          throw new Error(e);
        });
      res.json(result);
    }
  } catch (error) {
    res.status(400).json({ error });
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
router.get("/deletePosts", async (req, res) => {
  try {
    await Post.deleteMany({});
    res.send("Posts Deleted");
  } catch (e) {
    res.json({ error: e });
  }
});
router.delete("/post", async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await Post.findOneAndDelete({ _id });
    if (result === null) throw new Error("No se encontro el post");
    res.send(result);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

router.post("/comment", async (req, res) => {
  const { postId, text, author } = req.body;
  try {
    Comment.create({ postId, author, text }, { new: true })
      .then((e) => {
        Post.findByIdAndUpdate(postId, { $inc: { numComments: 1 } }).then(
          () => {
            res.json(e);
          }
        );
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
router.get("/comments/:id", (req, res) => {
  Comment.find({ postId: req.params.id }).then((e) => {
    res.json(e);
  });
});

export default router;
