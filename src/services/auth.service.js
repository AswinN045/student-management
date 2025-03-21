const userService = require('./user.service');

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.validPassword(password))) {
    return { statusValue: 0, statusText: "Incorrect email or password" }
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword
}
