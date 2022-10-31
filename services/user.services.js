const bcryptjs = require("bcryptjs");

const User = require("../schemas/User");

const { generateJWT, errorFactory } = require("../utils/utils");

class UserService {
  save(name, email, password, profileImage) {
    const user = new User({ name, email, password, profileImage });
    return user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw errorFactory("User not found", 400);
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      throw errorFactory("Invalid password", 401);
    }

    return {
      user,
      token: await generateJWT(user.id),
    };
  }
}

const userService = new UserService();

module.exports = userService;
