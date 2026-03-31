const usersService = require('../services/users-service');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getUserEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await usersService.getUserEmail(email);

    res.status(200).json(user);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
};

exports.getUserReports = async (req, res) => {
  try {
    const { email } = req.params;
    const reports = await usersService.getUserReports(email);

    res.status(200).json(reports);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email: oldEmail } = req.params;
    const { email: newEmail, password: newPassword } = req.body;
    const updatedUser = await usersService.updateUser(
      oldEmail,
      newEmail,
      newPassword,
    );

    res.status(200).json(`${updatedUser.email} has been successfully updated.`);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const deletedUser = await usersService.deleteUser(email);

    res
      .status(200)
      .json({ message: `${deletedUser.email} was successfully deleted.` });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
};
