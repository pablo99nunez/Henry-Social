import { Router } from "express";
import Request, { IDone } from "../models/Request";
import axios from "axios";

const router = Router();
router.get("/request", (req, res) => {
  Request.find({})
    .populate("user", "name username email admin uid role")
    .then((results) => {
      res.json(results);
    });
});

router.post("/request", async (req, res) => {
  const { user, solicitud, data, done } = req.body;
  try {
    const request = await Request.create({ user, solicitud, data, done });
    res.status(201).json({ request });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/request", async (req, res) => {
  const { id } = req.body;
  Request.findByIdAndDelete(id)
    .then((e) => {
      res.json(e);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.post("/resolve", async (req, res) => {
  const { type } = req.body;
  const data = JSON.parse(req.body.data);
  console.log(data);
  try {
    if (data.changes.role) {
      switch (type) {
        case IDone.Rol: {
          await axios.put("/user", {
            _id: data._id,
            changes: { role: data.changes.role },
          });
        }
      }
      res.json("Actualizado");
    } else res.status(400).json({ error: "Los datos son incorrectos" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
