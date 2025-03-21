const User = require('../models/user.model');

const createUser = async (userBody) => {
  try {
    const emailExist = await User.findOne({ email: userBody.email });
    if (emailExist !== null) {
      return { statusValue: 0, statusText: "Email already exist" }
    }
    const users = await User.create(userBody);
    return users;
  } catch (error) {
    return error
  }
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email: email });
};


module.exports = {
  createUser,
  getUserByEmail,
};
