const jwt = require('jsonwebtoken');

const User = require('../schemas/User');
const { customErrorResponse } = require('../utils/responses');

/**
 * Auths token and puts user info on req.user
 * @param req - Request
 * @param res - Response
 * @param next - Next function
 */
const authToken = async (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return customErrorResponse(res, "User is not logged in", 400);
    }

    if (!authHeader.startsWith("Bearer ", 0)) {
        return customErrorResponse(res, "Bad authorization", 400);
    }

    const token = authHeader.substring(7, authHeader.length);

    try {

        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(id).exec();
        if (!user) {
            return customErrorResponse(res, "Invalid token: user not found", 400);
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        customErrorResponse(res, "Invalid token", 401);
    }

}

module.exports = { authToken };
