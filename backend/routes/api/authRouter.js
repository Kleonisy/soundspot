const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

// authorization

router.post('/log', async (req, res) => {
  try {
    const findUser = await User.findOne({ where: { email: req.body.email } });
    if (findUser) {
      const isSame = await bcrypt.compare(req.body.password, findUser.password);
      if (isSame) {
        req.session.userId = findUser.id;
        res.json(findUser);
      } else {
        res.json({ status: 'Failed' });
      }
    } else {
      res.json({ status: 'Failed' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// logout

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: 'Failed to logout' });
      return;
    }
    res.clearCookie('user_sid');
    res.redirect('/');
  });
});

// registration

router.post(('/reg'), async (req, res) => {
  try {
    const userWithEmail = await User.findOne({ where: { email: req.body.regEmail } });
    const userWithLogin = await User.findOne({ where: { login: req.body.regLogin } });

    const regEx = /.+@.+\..+/;

    if (userWithEmail) {
      res.json({ status: 'User with this email already exists' });
    } else if (userWithLogin) {
      res.json({ status: 'User with this login already exists' });
    } else if (req.body.regLogin.length === 0) {
      res.json({ status: 'Login cannot be zero length' });
    } else if (!regEx.test(req.body.regEmail)) {
      res.json({ status: 'Wrong email format' });
    } else if (req.body.regPassword.length < 6) {
      res.json({ status: 'Change your password! Length less than 6 characters' });
    } else {
      const hash = await bcrypt.hash(req.body.regPassword, 10);
      const newUser = await User.create(
        {
          login: req.body.nameReg,
          email: req.body.mailReg,
          password: hash,
        },
      );
      req.session.userId = newUser.id;
      res.json(newUser);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
