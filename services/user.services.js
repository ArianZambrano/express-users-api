const bcryptjs = require("bcryptjs");

const User = require("../schemas/User");

const { cloudinaryImageDelete } = require("../utils/cloudinaryImageDelete");
const { cloudinaryImageUpload } = require("../utils/cloudinaryImageUpload");
const { generateJWT, errorFactory, encryptPassword } = require("../utils/utils");


/**
 *  User service for user CRUD operations and login
 *  @class UserService
 * */
class UserService {
    /**
     * @param name - User name
     * @param email - User email
     * @param password - User password
     * @param profileImage - User profile image
     */
    save(name, email, password, profileImage) {
        const user = new User({ name, email, password, profileImage });
        return user.save();
    }
    /**
     * @param email - User email
     * @param password - User password
     */
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
            token: await generateJWT(user.id)
        };

    }
    /**
     * @param id - User id
     * @param followers - Get followers
     * @param following - Get users following
     */
    async getUserById(id, followers, following) {
        const user = await User.findById(id).exec();
        if (followers) {
            await User.populate(
                user,
                {
                    path: 'followers',
                    model: 'User',
                    select: 'name profileImage'
                }
            );
        }

        if (following) {
            await User.populate(
                user,
                {
                    path: 'following',
                    model: 'User',
                    select: 'name profileImage'
                }
            );
        }

        return user;
    }

    /**
     * @param query - Query to search
     * @param from - From where to start
     * @param limit - Limit of results
     * @param sort - Sort by
     */
    async getUsers(query, from, limit, sort) {
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query).skip(from).limit(limit).sort(sort).exec()
        ]);
        return { total, users };
    }
    /**
     * @param id - User id
     */
    async deleteUser(id) {
        const user = await User.findByIdAndDelete(id).exec();
        cloudinaryImageDelete(user.profileImage, "Kisaragi");
    }

    /**
     * @param id - User id
     * @param description - User description
     * @param password - User password
     * @param file - User profile image
     */
    async updateUser(id, description, password, file) {
        const user = await User.findById(id).exec();
        user.description = description;
        if (password) {
            user.password = encryptPassword(password);
        }
        if (file) {
            cloudinaryImageDelete(user.profileImage, "Kisaragi");
            user.profileImage = await cloudinaryImageUpload(file, "Kisaragi");
        }
        await user.save();
    }
}

/**
 * @type {UserService}
 */
const userService = new UserService();

module.exports = userService;