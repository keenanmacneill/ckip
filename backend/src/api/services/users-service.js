const usersModel = require('../models/users-model');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

exports.getAllUsers = async () => {
  return await usersModel.getAllUsers();
};

exports.getUserEmail = async email => {
  const user = await usersModel.getUserEmail(email);

  if (!user) {
    const error = new Error('User does not exist.');
    error.status = 404;
    throw error;
  }

  return user;
};

exports.getUserReports = async email => {
  const user = await usersModel.getUserEmail(email);

  if (!user) {
    const error = new Error('User does not exist.');
    error.status = 404;
    throw error;
  }

  const reports = await usersModel.getUserReports(email);

  return reports;
};

exports.updateUser = async (oldEmail, newEmail, newPassword) => {
  const normalizedOldEmail = oldEmail.trim().toLowerCase();
  const normalizedNewEmail = newEmail.trim().toLowerCase();
  const user = await usersModel.getUserEmail(normalizedOldEmail);

  if (!user) {
    const error = new Error('User does not exist.');
    error.status = 404;
    throw error;
  }

  const newHashWord = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const [updatedUser] = await usersModel.updateUser(
    user,
    normalizedOldEmail,
    normalizedNewEmail,
    newHashWord,
  );

  return updatedUser;
};

exports.deleteUser = async email => {
  const user = await usersModel.getUserEmail(email);

  if (!user) {
    const error = new Error('User does not exist.');
    error.status = 404;
    throw error;
  }

  const [deletedUser] = await usersModel.deleteUser(email);
  console.log(deletedUser);

  return deletedUser;
};
