/* eslint-disable @typescript-eslint/no-var-requires */

require("dotenv").config();
import { Router, Request, Response } from "express";
import Post, { Comment } from "../models/Post";
import User, { NotificationType } from "../models/User";
import nodemailer from "nodemailer";
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

router.post("/posts", async (req, res) => {
   try {
     const { _id, liked, props, tag } = req.body;
 
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
       : tag
       ? await Post.find({
         tags: tag
       })
       : await Post.find({
           ...props,
         }).populate("author", "name avatar username");
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
      throw new Error(e.message);
    });
    const comment = await Comment.findById( _id ).catch((e)=>{
      throw new Error(e.message);
    });
    console.log("Posteo", post?.nLikes.includes(author._id));
    const isLikedAlready = post?.nLikes.includes(author._id);
    const isCommentAlready = comment?.nLikes.includes(author._id); 
    console.log("Comentario: ", comment, isCommentAlready);

    if(post){
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
          throw new Error(e.message);
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
          //console.log(e.message);
          throw new Error(e);
        });
      res.json(result);
    }
   }

   if(comment){
      if (!isCommentAlready) {
        console.log("Liking Comment");
        const result = await Comment.findByIdAndUpdate(
          _id,
          {
            $addToSet: { nLikes: author },
          },
          { new: true }_id: post._id
        )
          .populate("author", "name username avatar")
          .catch((e) => {
             //console.log(e.message);
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
             //console.log(e.message);
            throw new Error(e);
          });
        res.json(result);
      } else {
        console.log("Disliking Comment");
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
            //console.log(e.message);
            throw new Error(e);
          });
        res.json(result);
      }
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

router.get("/deleteComments", (req, res) => {
  Comment.deleteMany({}).then((e) => {
    Post.updateMany({}, { numComments: 0 }).then(() => {
      res.json("deleted");
    });
  });
});

router.get("/comments/:id", (req, res) => {
  Comment.find({ postId: req.params.id })
    .populate("author", "name username avatar")
    .then((e) => {
      res.json(e);
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

    if(!post) return res.sendStatus(204);

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

export default router;
