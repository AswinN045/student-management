const catchAsync = require('../utils/catchAsync');
const { authService, tokenService } = require('../services');
const userService = require('../services/user.service');

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const userData = await authService.loginUserWithEmailAndPassword(email, password);
    if (userData.statusValue === 0) {
        res.send(userData)
    } else {
        const { password, ...user } = userData.toJSON();
        const tokens = await tokenService.generateAuthTokens(userData);
        res.send({ user, tokens });
    }
});

module.exports = {
    login
}
