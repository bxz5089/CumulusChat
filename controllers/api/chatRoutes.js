const router = require('express').Router();
const { Chat } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newChat = await Chat.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newChat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const chatData = await Chat.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!chatData) {
      res.status(404).json({ message: 'No chat message found with this id!' });
      return;
    }

    res.status(200).json(chatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
