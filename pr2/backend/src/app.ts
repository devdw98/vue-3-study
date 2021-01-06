import express from 'express';
import session from 'express-session';
// import FileStore from 'session-file-store';
import { connect } from './config/dbConfig';
import cors from 'cors';
import { IUser } from './models/user';

import { postRouter } from './routes/post';
import {userRouter} from './routes/user';



const app = express();
app.use(express.json()); //body-parser
app.use(cors());
app.use(session({
    secret: 'qwerty!@#$%^zxcvb',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    // store: new FileStore({})
}));

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('hello typescript express!');
});

connect(); //db connect

app.listen(3000, () => {
    console.log('http://localhost:3000');
})

declare module 'express-session' {
    interface SessionData{
        _user?: IUser;
        isLogined?: boolean;
    }
}