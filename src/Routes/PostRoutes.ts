import { Router } from "express";
import Post from "../models/Post";

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
        })
          .populate("author")
          .populate("nLikes")
      : liked
      ? await Post.find({
          nLikes: {
            _id: liked,
          },
        })
          .populate("author")
          .populate("nLikes")
      : await Post.find({}).populate("author").populate("nLikes");

    res.json(posts);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author")
      .populate("nLikes");
    res.json(post);
  } catch (e) {
    res.status(401).json({ error: e });
  }
});
router.post("/like", async (req, res) => {
  try {
    const { _id, author } = req.body;
    const post = await Post.findById(_id)
      .populate("nLikes")
      .catch((e) => {
        throw new Error(e);
      });
    const isLikedAlready = !!post?.nLikes.filter(
      (e) => e.username === author.username
    )[0];
    console.log(
      post?.nLikes.filter((e) => {
        console.log(e, author.username);
        return e._id == author._id;
      })
    );
    if (!isLikedAlready) {
      console.log("Liking");
      const result = await Post.findByIdAndUpdate(
        _id,
        {
          $addToSet: { nLikes: author },
        },
        { new: true }
      )
        .populate("author")
        .populate("nLikes")
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
        .populate("author")
        .populate("nLikes")
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
router.delete("/posts", async (req, res) => {
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

export default router;
