const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogposts/post/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'Blog post not found' });
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

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login', { logged_in: req.session.logged_in });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup', { logged_in: req.session.logged_in });
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
