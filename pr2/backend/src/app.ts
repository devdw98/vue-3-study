import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import { connect } from './config/dbConfig';
import cors from 'cors';
// import MongoClient, { Collection } from 'mongodb';
import { IUser } from './models/user';
// import {IPost} from './models/post';

import { postRouter } from './routes/post';
import {userRouter} from './routes/user';

// const fileStore = FileStore(session);

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

// const DATABASE_NAME = 'pr2';
// const CONNECTION_URL = `mongodb+srv://dwroot:dwroot@dw-cluster.pcdjg.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

// var database: MongoClient.Db;
// var postCollection: Collection<IPost>
// var userCollection: Collection<IUser>;

app.get('/', (req, res) => {
    res.send('hello typescript express!');
});

// declare module 'express-session' {
//     interface SessionData{
//         _user? : IUser;
//     }
// }

connect(); //db connect


// MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//         throw err;
//     }
//     database = client.db(DATABASE_NAME);
//     // postCollection = database.collection('Post');
//     // userCollection = database.collection('User');
// })

app.listen(3000, () => {
    console.log('http://localhost:3000');
})

// export { database }
// export {postCollection, userCollection}
declare module 'express-session' {
    interface SessionData{
        _user?: IUser;
        isLogined?: boolean;
    }
}