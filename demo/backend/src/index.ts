import express from 'express';
import mongoose from 'mongoose'; //db
import cors from 'cors';

import { userRouter } from './routes/user';


const app = express();
app.use(express.json()); //body-parser
app.use(cors()); 

//routes
app.use('/api/users',userRouter);

mongoose.connect('mongodb://localhost:27017/pr2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () => console.log("connected to MongoDB..."));

app.listen(3000, () => {
    console.log('http server listen on 3000');
});