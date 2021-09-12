const { PrismaClient } = require(".prisma/client");
const express = require("express");


const router = express.Router();

const prisma = new PrismaClient();


router.post('/createPost', async (req, res) => {
    const { title, post, user_id} = req.body;

    const User = await prisma.user.findUnique({
        where: {
            id: user_id,
        }
    });

    if(!User) {
        return res.status(400).json({
            msg: "There is no user with that credentials."
        })
    }

    const Post = await prisma.post.create({
        data: {
            title,
            post,
            user_id
        }
    });

    res.json(Post);
})

module.exports = router;