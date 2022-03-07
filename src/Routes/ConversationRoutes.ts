import axios from "axios";
import { Router } from "express";
import Conversation, { IMessage, Message } from "../models/Conversation";

const router = Router();

router.post("/find", async (req, res) => {
  const { userA, userB } = req.body;
  try {
    const conversation = await Conversation.findOne({
      $or: [
        { userA, userB },
        { userA: userB, userB: userA },
      ],
    });
    if (conversation) {
      return res.json(conversation);
    }
    res.status(404);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { userA, userB } = req.body;

  if (userA && userB) {
    try {
      const conversation = await Conversation.create({ userA, userB });
      res.json(conversation);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(406).json({ error: "No se han proporcionado los datos" });
  }
});

router.post("/message", async (req, res) => {
  const { avatar, message, name, receiver, sender, time } =
    req.body as IMessage;
  console.log(req.body);
  if (avatar && message && name && receiver && sender && time) {
    try {
      let conversation = await Conversation.findOne({
        $or: [
          { userA: receiver, userB: sender },
          { userA: sender, userB: receiver },
        ],
      });
      if (!conversation) {
        const id = await axios
          .post("/conversation", { userA: receiver, userB: sender })
          .then((e) => e.data._id);
        conversation = await Conversation.findById(id);
      }
      if (conversation) {
        const docMessage = await Message.create({ ...req.body });
        conversation.messages.push(docMessage);
        await conversation.save();
        res.json(conversation);
      } else res.status(500).json({ error: "No se encontro la conversacion" });
    } catch (e) {
      res.status(501).json({ error: e });
    }
  } else {
    res.status(406).json({ error: "No se han proporcionado los datos." });
  }
});

export default router;
