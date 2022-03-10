/* eslint-disable @typescript-eslint/no-var-requires */

// tslint:disable-next-line:no-var-requires
require("dotenv").config();
import { Router, Request, Response } from "express";
import Post, { Comment } from "../models/Post";
import User, { NotificationType } from "../models/User";
const nodemailer = require("nodemailer");
import axios from "axios";

import sendEmail from "./Helpers/sendEmail";

const { MAIL, MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: MAIL,
    pass: MAIL_PASSWORD,
  },
});

const router = Router();

router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    res.json(post);
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

router.post("/editPost", async (req, res) => {
  const { post, idPost } = req.body;
  try {
    Post.findByIdAndUpdate(idPost, post).then((post) => res.json(post));
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

router.delete("/post", async (req, res) => {
  const { _id } = req.body;
  try {
    Post.findById(_id).then((post) => {
      post?.typePost === "share" &&
        Post.findByIdAndUpdate(post.company, {
          $inc: { nShares: -1 },
        }).then(() => {
          console.log("Se quito una compartida");
        });
      Post.deleteOne({ _id }).then((postDelete) => {
        if (postDelete === null) throw new Error("No se encontro el post");
        res.status(200).json(postDelete);
      });
    });
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

router.post("/posts", async (req, res) => {
  try {
    const { _id, liked, props, tag } = req.body;

    const posts = _id
      ? await Post.find({
          author: {
            _id,
          },
        })
          .populate("author", "name avatar username role")
          .populate("respuestaAuthor", "name username")
      : liked
      ? await Post.find({
          nLikes: {
            _id: liked,
          },
        })
          .populate("author", "name avatar username role")
          .populate("respuestaAuthor", "name username")
      : tag
      ? await Post.find({
          tags: tag,
        })
          .populate("author", "name avatar username role")
          .populate("respuestaAuthor", "name username")
      : await Post.find({
          ...props,
        })
          .populate("author", "name avatar username role")
          .populate("respuestaAuthor", "name username");

    res.json(posts);
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

router.post("/like", async (req, res) => {
  try {
    const { _id, author } = req.body;
    const post = await Post.findById(_id).catch((e) => {
      throw new Error(e.message);
    });
    const comment = await Comment.findById(_id).catch((e) => {
      throw new Error(e.message);
    });
    const isLikedAlready = post?.nLikes.includes(author._id);
    const isCommentAlready = comment?.nLikes.includes(author._id);

    if (post) {
      if (!isLikedAlready) {
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
            throw new Error(e.message);
          });
        res.json(result);
      } else {
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
            throw new Error(e);
          });
        res.json(result);
      }
    }

    if (comment) {
      if (!isCommentAlready) {
        const result = await Comment.findByIdAndUpdate(
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
            type: NotificationType.CommentLike,
            receptor: result?.author._id,
            emisor: author._id,
            link: "/post/" + _id,
          })
          .catch((e) => {
            throw new Error(e);
          });
        res.json(result);
      } else {
        const result = await Comment.findByIdAndUpdate(
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
            throw new Error(e);
          });
        res.json(result);
      }
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/share", async (req, res) => {
  const { author, company: idPost } = req.body;
  try {
    Post.create(req.body)
      .then((e) => {
        Post.findByIdAndUpdate(idPost, {
          $inc: { nShares: 1 },
        }).then((post) => {
          if (post) {
            axios.post("/notification", {
              type: NotificationType.Share,
              receptor: post.author,
              emisor: author,
              link: "/post/" + post._id,
            });
            res.json(post);
          }
        });
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/comments/:id", (req, res) => {
  Comment.find({ postId: req.params.id })
    .populate("author", "name username avatar")
    .then((e) => {
      res.json(e);
    });
});

router.post("/comment", async (req, res) => {
  const { postId, text, author } = req.body;
  try {
    Comment.create({ postId, author, text }, { new: true })
      .then((e) => {
        Post.findByIdAndUpdate(postId, {
          $inc: { numComments: 1 },
        }).then((post) => {
          if (post) {
            axios.post("/notification", {
              type: NotificationType.Comment,
              receptor: post.author,
              emisor: author,
              link: "/post/" + post._id,
            });
            res.json(e);
          }
        });
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/comment", async (req, res) => {
  const { postId } = req.body;
  try {
    Comment.findByIdAndDelete(postId)
    .then(() => {
      Post.findByIdAndUpdate(postId, {
        $inc: { numComments: 0 }
      }).then((post) => {            
        res.status(200).json(post)
      })
    })
  } catch (e) {
      res.status(401).json({ error: e });
    }
  });

router.get("/deleteComments", (req, res) => {
  Comment.deleteMany({}).then((e) => {
    Post.updateMany({}, { numComments: 0 }).then(() => {
      res.json("deleted");
    });
  });
});

router.post("/report", async (req: Request, res: Response) => {
  const { _id, username } = req.body;

  try {
    const user = await User.findOne({ username });

    const post = await Post.findByIdAndUpdate(
      _id,
      { $inc: { reportedTimes: 1 } },
      { new: true }
    );

    const eliminated = post?.reportedTimes && post?.reportedTimes >= 5;

    if (!post) return res.sendStatus(204);

    if (eliminated) {
      sendEmail({
        _id,
        transporter,
        deleted: true,
        from: MAIL,
        to: MAIL,
        username: user?.username,
      });
      sendEmail({
        _id,
        transporter,
        deleted: true,
        from: MAIL,
        to: user?.email,
        username: user?.username,
      });
      res.status(200).json(post);
      return axios.delete("/post", {
        data: {
          _id,
        },
      });
    }

    sendEmail({
      _id,
      transporter,
      from: MAIL,
      to: MAIL,
      username: user?.username,
    });
    sendEmail({
      _id,
      transporter,
      from: MAIL,
      to: user?.email,
      username: user?.username,
    });

    res.status(200).json("Post reported");
  } catch (error) {
    res.status(400);
  }
});

router.put("/answer", (req, res) => {
  const { idPost, response, respuestaAuthor } = req.body;
  Post.findByIdAndUpdate(
    idPost,
    {
      respuesta: response,
      respuestaAuthor,
    },
    { new: true }
  )
    .then((e) => {
      res.json(e);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

export default router;
