const User = require("../schemas/User");
const { customErrorResponse } = require("../utils/responses");

const validImageExtensions = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];

/**
 * Validates that the files exist
 * @param req - request
 * @param res - response
 * @param next - next middleware
 */
const fileValidator = (req, res, next) => {
  if (!req.files) {
    return customErrorResponse(res, "File not sent", 400);
  }
  if (!req.files.file) {
    return customErrorResponse(res, "File not sent correctly", 400);
  }
  next();
};

/**
 * Validates that the file has a valid extension
 * @param req - request
 * @param res - response
 * @param next - next middleware
 */
const imageExtensionMiddleware = (req, res, next) => {
  let extension = req.files.file.name.split(".");
  extension = extension[extension.length - 1];

  if (!validImageExtensions.includes(extension)) {
    return customErrorResponse(res, "Invalid extension", 400);
  }

  next();
};

/**
 * Validates that the user is not following himself
 * @param req - request
 * @param res - response
 * @param next - next middleware
 */
const differentUserToFollow = (req, res, next) => {
  if (req.user.id == req.query.followId) {
    return customErrorResponse(res, "You cannot follow yourself", 403);
  }
  next();
};

/**
 * Validates that the user is not unfollowing himself
 * @param req 
 * @param res 
 * @param next 
 */
const differentUserToUnfollow = (req, res, next) => {
  if (req.user.id == req.query.unfollowId) {
    return customErrorResponse(res, "You cannot unfollow yourself", 403);
  }
  next();
};

/**
 * Checks if the user is following the operationalId
 * @param userId 
 * @param operationalId 
 */
const isFollowingQuery = async (userId, operationalId) => {
  return User.findOne({
    _id: userId,
    following: {
      $in: [operationalId],
    },
  }).exec();
};

/**
 * Checks if the user is already following the user to follow
 * @param req - request
 * @param res - response
 * @param next - next middleware
 */
const alreadyFollowingUser = async (req, res, next) => {
  const { followId } = req.query;
  const user = req.user;

  const userFollowed = await isFollowingQuery(user.id, followId);

  if (userFollowed) {
    return customErrorResponse(res, "Already following user", 400);
  }

  next();
};

/**
 * Checks if the user is following the user to unfollow
 * @param req - request
 * @param res - response
 * @param next - next middleware
 */
const userIsNotFollowed = async (req, res, next) => {
  const { unfollowId } = req.query;
  const user = req.user;

  const userToUnfollow = await isFollowingQuery(user._id, unfollowId);

  if (!userToUnfollow) {
    return customErrorResponse(
      res,
      "Cannot unfollow user who you are not following",
      400
    );
  }

  next();
};

module.exports = {
  fileValidator,
  imageExtensionMiddleware,
  differentUserToFollow,
  differentUserToUnfollow,
  alreadyFollowingUser,
  userIsNotFollowed,
};
