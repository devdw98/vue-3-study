import { MongoClient, Db, Collection } from "mongodb";
import { IUser } from '../models/user';
import {IPost} from '../models/post';

const DATABASE_NAME = 'pr2';
const CONNECTION_URL = `mongodb+srv://dwroot:dwroot@dw-cluster.pcdjg.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
// const CONNECTION_URL = 'mongodb://localhost:27017';
const client = new MongoClient(CONNECTION_URL, { useUnifiedTopology: true });

export let database: Db;
export let userCollection: Collection<IUser>;
export let postCollection: Collection<IPost>;

export const connect = async (dbName: string = DATABASE_NAME) => {
    const conn = await client.connect();
    database = conn.db(dbName);
    userCollection = database.collection('User');
    postCollection = database.collection('Post');
    return client;
};