import express, { Request, Response } from 'express';
import * as argon2 from 'argon2';
import { User } from '../models/User';

const router = express.Router();

router.post('/users/register', async (req: Request, res: Response) => {
    const { uid, reqPw } = req.body;
    try { 
        console.log(reqPw);
        const password = await argon2.hash(reqPw);
        // console.log(password);
        const user = new User({ uid, password });
        await user.save();
        return res.status(201).json({success: true})
    } catch (err) {
        return res.status(500).json({success: false, err: err.message})
    }
});

router.post('/users/login', (req: Request, res: Response) => {
    const { uid, reqPw } = req.body;
    User.findOne({ uid: uid },async (err: any, user: any) => {
        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }
        // console.log(reqPw);
        try { 
            if (await argon2.verify(user.password, reqPw)) {
                return res.json({ success: true})
            } else {
                return res.json({ success: false, message: "password did not match" });
            }
        } catch (err) {
            return res.status(500).json({success: false, err: err.message})
        }
    })
})

export { router as userRouter };