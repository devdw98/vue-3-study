import express, { Request, Response } from 'express';
import argon2 from 'argon2';

import { User } from '../models/user';

const router = express.Router();

//register
router.post('/register', async (req: Request, res: Response) => {
    const { username, req_pw } = req.body;
    const dbUser = await User.findOne({ username });
    if (dbUser) {
        console.log(dbUser);
        return res.status(404).json({ message: "duplicated username" });
    }

    try {
        const password = await argon2.hash(req_pw);
        const user = new User({ username, password });
        user.save();
        return res.status(201).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err })
    }
});

router.post('/login', async (req: Request, res: Response) => {
    
})


export {router as userRouter}