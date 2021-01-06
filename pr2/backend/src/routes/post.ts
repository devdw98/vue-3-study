import express, { Request, Response } from 'express';
import { IPost } from '../models/post';
import { postCollection } from '../config/dbConfig';
import { ObjectId } from 'mongodb';

const router = express.Router();

//글 작성
router.post('/', async (req: Request, res: Response) => {
//    if (req.session) {
        const memo: IPost = {
            title: req.body.title,
            content: req.body.content,
            _writer: req.body.writer,//req.session._user?.username,
            createdAt: new Date,
            updatedAt: new Date
        };
        try {
            await postCollection.insertOne(memo, (err, result) => {    
                return err ? res.json({ message: err.message }) : res.json({ memo: result });
            })
        } catch (err) {
            return res.json({message: err.message})
        }
//    }
 //   return res.json({message: 'Unable to write'})
});

//전체 글 보기
router.get('/', async (req: Request, res: Response) => {
    try {
        const page = (parseInt(req.params.page, 10) - 1) * 5
        const cursor = postCollection.find({}, {
            sort: { createdAt: -1},
            limit: 5,
            skip: page
        });
        console.log(req.session);
        return res.json({ memos: await cursor.toArray() });
    } catch (err) {
        return res.json({message: err.message })
    }
}); 

// 상세 글 보기
router.get('/:id', async (req: Request, res: Response) => {
    try {
        await postCollection.findOne(new ObjectId(req.params.id), (err, result) => {
            return err? res.json({ message: err.message }):res.json({ memo: result });
        })
    } catch (err) {
        return res.json({ message: err.message });
    }
});

// 글 수정
router.put('/:id', async (req: Request, res: Response) => {
    try {
        await postCollection.findOne({ _id: req.params.id }, (err, result) => {
        //    if (result._writer === req.session._user?.username) {
                postCollection.updateOne(
                    {
                        _id: req.params.id
                    },
                    {
                        title: req.body.title,
                        content: req.body.content,
                        updatedAt: new Date
                    }, (err, data) => {
                        return err? res.json({message:err.message}) :res.json({ memo: data });
                    });
                
            // } else {
            //     return res.json({ message: err.message });
            // }
        })
    } catch (err) {
        return res.json({ message: err.message });
    }
    
});

//글 삭제
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await postCollection.findOne(new ObjectId(req.params.id ), (err, result) => {
            // return res.send(result)
        //    if (result._writer === req.session._user?.username) {
                postCollection.deleteOne(result, (err, result) => {
                    console.log(result.deletedCount);
                    return err ? res.json({ message: err.message }) : res.json({ success: true })
                });
        //    } else {
        //        return res.json({ message: err.message })
        //    }
        });
    } catch (err) {
        return res.json({ message: err.message });
    }
});

export { router as postRouter };