const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId,
        });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a post by id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!updatedPost[0]) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a post by id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedPost) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;