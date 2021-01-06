import express, { Request, Response } from 'express';
import argon2 from 'argon2';
import { IUser } from '../models/user';
import {userCollection} from '../config/dbConfig';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    userCollection.findOne(
        { username: req.body.username }, async (err1: any, user: IUser) => {
            if (user) {
                return res.status(409).json({ message: "duplicated username." })
            } else {
                try {
                    const hash = await argon2.hash(req.body.password);
                    const userInfo = { username: req.body.username, password: hash }
                    await userCollection.insertOne(userInfo);
                    return res.status(201).json({ message: "join success" });
                } catch (err) {
                    return res.json({ message: err.message })
                }
            }
        }
    )
});

router.post('/login', async (req: Request, res: Response) => {
    const userInfo: IUser = req.body;
    userCollection.findOne(
        { username: userInfo.username }, async (err, user) => {
            if (user) {
                try {
                    if (await argon2.verify(user.password, userInfo.password)) {
                        if (req.session._user === undefined) {
                            req.session._user = userInfo;
                            req.session.isLogined = true;
                            res.json({ message: "Login success", name: req.session._user.username});
                        }
                        return res;
                    } else {
                        return res.status(409).json({ message: "Incorrect password" });
                    }
                } catch (err) {
                    return res.json({ message: err.message })
                }
            } else {
                return res.json({ message: "No user information" })
            }
        }
    );
});

router.get('/logout', async (req: Request, res: Response) => {
    if (req.session._user) {
        req.session.destroy((err: Error) => {
            return err ? res.json({ message: err.message }) : res.json({ message: "deletion success" });
        });
    }
});

export {router as userRouter}