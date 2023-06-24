const router = require('express').Router();
const { BlogPost, User } = require('../models');
const isAuthenticated = require('../utils/isAuthenticated');

// GET route for the dashboard
router.get('/', isAuthenticated, async (req, res) => {
    try {
        // Retrieve the blog posts associated with the logged-in user
        const blogPostData = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

        res.render('dashboard', {
            blogPosts,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route to update a blog post
router.post('/update/:id', isAuthenticated, async (req, res) => {
    try {
        const blogPostData = await BlogPost.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogPostData[0]) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        // Redirect to the dashboard
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});


// POST route to create a new blog post
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

// PUT route to update a blog post
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const blogPostData = await BlogPost.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogPostData[0]) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE route to delete a blog post
router.delete('/delete/:id', isAuthenticated, async (req, res) => {
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

        // Blog post deleted successfully
        res.status(200).json({ message: 'Blog post deleted successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to render the edit post form
router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        if (!blogPostData) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        const blogPost = blogPostData.get({ plain: true });

        res.render('edit', {
            blogPost,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
