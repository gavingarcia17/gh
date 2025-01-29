const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            userId: req.session.userId,
            postId: req.body.postId,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to get comments for a specific post
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: {
                postId: req.params.postId,
            },
            include: [{ model: User, attributes: ['username'] }],
        });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;