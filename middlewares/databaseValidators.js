const User = require("../schemas/User");

const uniqueUserName = async (userName) => {
  const userNameExists = await User.findOne({
    name: userName,
  }).exec();

  if (userNameExists) {
    throw new Error(`${userName} already exists on database.`);
  }
};

const uniqueUserEmail = async (userEmail) => {
  const userEmailExists = await User.findOne({
    email: userEmail,
  }).exec();

  if (userEmailExists) {
    throw new Error(`${userEmail} already exists on database.`);
  }
};

module.exports = {
  uniqueUserEmail,
  uniqueUserName,
};
