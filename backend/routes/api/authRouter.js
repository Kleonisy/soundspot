const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router.get('/', async (req, res) => {
  const { userId } = req.session;
  if (userId) {
    const user = await User.findOne({ where: { id: userId } });
    res.json({ hasUser: true, user });
  } else {
    res.json({ hasUser: false });
  }
});

// authorization

router.post('/login', async (req, res) => {
  if (req.body.email.length < 1 || req.body.password.length < 1) {
    return res.json({ message: 'Fill in all required fields' });
  }
  try {
    const findUser = await User.findOne({ where: { email: req.body.email } });
    if (findUser) {
      const isSame = await bcrypt.compare(req.body.password, findUser.password);
      if (isSame) {
        req.session.userId = findUser.id;
        res.json({ user: findUser });
      } else {
        res.json({ message: 'Invalid email or password' });
      }
    } else {
      res.json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

// logout

router.delete('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: 'Failed to logout' });
      return;
    }
    res.clearCookie('user_sid');
    res.json({ success: true });
  });
});

// registration

router.post(('/reg'), async (req, res) => {
  try {
    const userWithEmail = await User.findOne({ where: { email: req.body.email } });
    const userWithLogin = await User.findOne({ where: { login: req.body.login } });

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
          login: req.body.login,
          email: req.body.email,
          password: hash,
          about: null,
          latitude: 0,
          longitude: 0,
          contact: null,
          photo: null,
        },
      );
      req.session.userId = newUser.id;
      res.json({ user: newUser });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
