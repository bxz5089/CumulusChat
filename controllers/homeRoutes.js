const router = require('express').Router();
const { Chat, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('startcloud');
});

router.get('/chat', async (req, res) => {
  try {
    // const chatData = await Chat.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: chat,
    //     },
    //   ],
    // });

    // const chat = chatData.get({ plain: true });

    res.render('chat', {
      // ...chat,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/user', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('user', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/chat');
    return;
  }

  res.render('login');
});

router.get('/signUp', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/signUp');
  //   return;
  // }

  res.render('signUp');
});

module.exports = router;
