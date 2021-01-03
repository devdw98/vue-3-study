import express, { Request, Response } from 'express'
import { Post } from '../models/Post';

const router = express.Router();

router.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) return res.status(500).json({ success: false, error: err });
        return res.status(200).json({ success: true, data: posts })
    })
});

router.post('/posts', (req, res) => {
    const data = {
       
        memo: req.body.memo,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    const newPost = new Post(data);
    newPost.save();
    return res.status(200).json({ success: true, data: newPost });
})

router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id)
        .exec((err, post) => {
            if (err) return res.status(500).json({ success: false, error: err });
            else if (!post) return res.status(500).json({ success: false, message: 'post not found' });
            else return res.status(200).json({ success: true, data: post });
    })
})

router.put('/posts/:id', (req, res) => {
    const data = { memo: req.body.memo, updatedAt: Date.now() }
    Post.findByIdAndUpdate(req.params.id, data)
        .exec((err, post) => {
            if (err) return res.status(500).json({ success: false, error: err });
            else if (!post) return res.status(500).json({ success: false, message: 'post not found' });
            else return res.status(200).json({ success: true, data: post });
    })
})

router.delete('/posts/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .exec((err, data) => {
            if (err) return res.status(500).json({ success: false, error: err });
            else return res.status(200).json({ success: true });
    })
})

export { router as postRouter };