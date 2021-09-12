const { PrismaClient } = require(".prisma/client");
const express = require("express");

const router = express.Router();

const { user } = new PrismaClient();

router.get('/selectedUser/:id', async (req, res) => {
    const { id } = req.params;

    const User = await user.findUnique({
        where: {
            id: +id
        },
        select: {
            id: true,
            username: true,
            posts: true,
        }
    })

    if(!User) {
        return res.status(400).json({
            msg: "There is no user with that credentials."
        })
    }

    res.json(User);
})

router.post('/createUser', async (req, res) => {
    const { username } = req.body;

    const ifUserExists = await user.findUnique({
        where: {
            username: username,
        }, 
        select: {
            id: true,
            username: true,
            posts: true,
        }
    })

    if(ifUserExists) {
        return res.status(400).json({
            msg: "User already exists."
        })
    }

    const User = await user.create({
        data: {
            username: username
        }
    });

    res.json(User);
})

router.get('/allUsers', async (req, res) => {
    const users = await user.findMany({
        select: {
            id: true,
            username: true,
            posts: true
        },
        // where: {
        //     id: 3
        // }
    })

    res.json(users);
})

module.exports = router;