import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// import cookieParser from 'cookieParser';
// import session from 'express-session';
import { userRouter } from './routes/User';
import { postRouter } from './routes/Post';

const app = express();
app.use(json());
app.use(cors());
// app.use(dotenv.config);
// app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(userRouter);
app.use(postRouter);

app.get('/', (req, res) => res.send('hello world!'));

mongoose.connect('mongodb://localhost:27017/testdb', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}, () => {
        console.log('connected to MongoDB...');
})

app.listen(3000, () => {
    console.log('http server listen on :3000');
})