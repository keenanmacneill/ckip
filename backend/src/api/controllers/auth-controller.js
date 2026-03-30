const authService = require('../services/auth-service');

exports.getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = await authService.getMe(token);

    res.status(200).json(user);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error.',
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await authService.registerUser(email, password);

    res
      .status(201)
      .json(`${newUser.email}'s account has been successfully created.`);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error.',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: `Welcome back, ${email}` });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error.',
    });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out.' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
