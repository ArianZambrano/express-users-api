const User = require("../schemas/User");

/**
 * Validates that the username is unique
 * @param userName - User name
 */
const uniqueUserName = async (userName) => {
  const userNameExists = await User.findOne({
    name: userName,
  }).exec();

  if (userNameExists) {
    throw new Error(`${userName} already exists on database.`);
  }
};

/**
 * Validates that the email is unique
 * @param userEmail - User email
 */
const uniqueUserEmail = async (userEmail) => {
  const userEmailExists = await User.findOne({
    email: userEmail,
  }).exec();

  if (userEmailExists) {
    throw new Error(`${userEmail} already exists on database.`);
  }
};

/**
 * Validates that the user exists on database
 * @param userId - User id
 */
const userNotExists = async userId => {

  const userExists = await User.findById(userId).exec();

  if (!userExists) {
    throw new Error('User does not exist on database.');
  }

}

module.exports = {
  uniqueUserEmail,
  uniqueUserName,
  userNotExists
};
