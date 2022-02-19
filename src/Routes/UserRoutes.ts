import { Router } from "express";
const axios = require("axios");
import User from "../models/User";
const router = Router();
router.post("/user", (req, res) => {
    console.log(req.body);
    const { name, username, email, avatar, createAt } = req.body;
    User.create({ name, username, email, avatar, createAt })
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((e) => res.status(400).json({ error: e }));
});
router.get("/users", async (req, res) => {
    try {
        let users = await User.find({});
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
        let user = await User.findOne({ username });
        if (!!user) {
            user.admin = !user.admin;
            await user.save();
            res.json(user);
        }
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

export async function isFollowing(userA: string, userB: string) {
    try {
        const isFollowing = await User.findOne({
            username: userA,
            following: { $in: userB },
        });
        if (isFollowing) return true;
    } catch (e) {
        throw new Error("Fallo al buscar el usuario: " + userA);
    }
    return false;
}

async function addFollower(seguido: string, seguidor: string) {
    let userA = await User.updateOne(
        { username: seguido },
        {
            $addToSet: {
                followers: seguidor,
            },
        },
        { returnOriginal: false }
    );
    let userB = await User.updateOne(
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
            const result = await axios.post("http://localhost:3001/unfollow", {
                seguido,
                seguidor,
            }); //Deja de seguir al usuario
            const userSeguidor = await axios
                .post("http://localhost:3001/findUser", {
                    username: seguidor,
                })
                .then((e: any) => e.data);
            const userSeguido = await axios
                .post("http://localhost:3001/findUser", {
                    username: seguido,
                })
                .then((e: any) => e.data);
            res.json({ userSeguidor, userSeguido });
        } else {
            try {
                await addFollower(seguido, seguidor);
                const userSeguidor = await axios
                    .post("http://localhost:3001/findUser", {
                        username: seguidor,
                    })
                    .then((e: any) => e.data);
                const userSeguido = await axios
                    .post("http://localhost:3001/findUser", {
                        username: seguido,
                    })
                    .then((e: any) => e.data);

                res.status(200).json({ userSeguidor, userSeguido });
            } catch (e) {
                res.status(400).json({ error: e });
            }
        }
    } catch (error) {
        res.status(400).json({ error: error });
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
