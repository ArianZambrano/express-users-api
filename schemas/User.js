const { Schema, model } = require("mongoose");

/**
 * User schema
 * @typedef {Object} User
 * @property {string} name - User name
 * @property {string} description - User description
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} profileImage - User profile image
 * @property {Array} followers - User followers
 * @property {Array} following - User following
 * @property {Date} createdAt - User creation date
 * @property {Date} updatedAt - User update date
 */
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});

/**
 * @returns {User} - User object without password and _id
 */
UserSchema.methods.toJSON = function () {
    const { _id, ...user } = this.toObject();
    user.userId = _id;
    return user;
}

module.exports = model('User', UserSchema);