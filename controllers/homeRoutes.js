const router = require('express').Router();
const { Chat, User } = require('../models');
const withAuth = require('../utils/auth');
const alert = require('alert'); 

router.get('/', async (req, res) => {
  res.render('start');
});

// router.get('/chat', async (req, res) => {
//   try {
//     // const chatData = await Chat.findByPk(req.params.id, {
//     //   include: [
//     //     {
//     //       model: chat,
//     //     },
//     //   ],
//     // });

//     // const chat = chatData.get({ plain: true });

//     res.render('chat', {
//       // ...chat,
//       // logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/chat', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Chat }],
    });

    const user = userData.get({ plain: true });

    res.render('chat', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    alert('User was previously logged in.');
    res.redirect('/chat');
    return;
  }
  res.render('login');
});

module.exports = router;
