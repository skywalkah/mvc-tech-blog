const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/dashboard'); // Redirect to the dashboard or another page
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
    } else {
      res.status(400).json({ message: 'Failed to sign up. Please try again.' });
    }
  }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again.' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
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

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
