const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');
const isAuthenticated = require('../../utils/isAuthenticated');

// Fetch a single blog post and its associated comments
router.get('/post/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [User],
        },
        {
          model: User,
          attributes: ['username'],
        }
      ],
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    const blogPost = blogPostData.get({ plain: true });

    res.render('blogpost', {
      blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new blog post
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a blog post
router.delete('/post/:id', isAuthenticated, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Blog post deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment for a blog post
router.post('/post/:id/comments', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { comment_text } = req.body;

    const newComment = await Comment.create({
      comment_text,
      user_id: req.session.user_id,
      blog_post_id: id,
    });

    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
