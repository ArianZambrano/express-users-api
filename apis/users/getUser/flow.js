const UserService = require("../../../services/user.services");
const { errorResponse } = require("../../../utils/responses");

/**
 * Gets a user
 * @param req - Request
 * @param res - Response
 */
const GetUserFlow = async (req, res) => {
    const { followers = false, following = false } = req.query;
    try {
        const user = await UserService.getUserById(req.params.id, followers, following);
        return res.status(201).json({
            user
        });
    }
    catch (error) {
        console.error(error);
        return errorResponse(res, "Getting user failed", error.message);
    }
}

module.exports = GetUserFlow;