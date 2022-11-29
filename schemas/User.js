const { Schema, model } = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name: 
 *          type: string
 *          description: the user's name
 *        description: 
 *          type: string
 *          description: the user's description
 *        email: 
 *          type: string
 *          description: the user's email
 *        password: 
 *          type: string
 *          description: encrypted password
 *        profileImage: 
 *          type: string
 *          description: base64 encoded image
 *        followers: 
 *          type: object
 *          description: user's followers
 *        following: 
 *          type: object
 *          description: user's following accounts
 *      required:
 *      - name
 *      - email
 *      - password
 *      example:
 *        name: Daniel Cifuentes
 *        email: daercimi@gmail.com
 *        password: 12315135134112agadg
 * 
 *    LoginResponse:
 *      type: object
 *      properties:
 *        ok: 
 *          type: bool
 *          description: if the request went ok or not
 *        msg: 
 *          type: string
 *          description: info message
 *        token:
 *          type: string
 *          description: user's token
 *        user:
 *          type: object
 *          description: user's info
 *      example:
 *        ok: true
 *        msg: Correct Request
 *        token: token de prueba
 *        user: UserObj
 * 
 *    CustomResponse:
 *      type: object
 *      properties:
 *        ok: 
 *          type: bool
 *          description: if the request went ok or not
 *        msg: 
 *          type: string
 *          description: info message
 *      example:
 *        ok: true
 *        msg: Correct Request
 *      
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

UserSchema.methods.toJSON = function () {
    const { _id, ...user } = this.toObject();
    user.userId = _id;
    return user;
}

module.exports = model('User', UserSchema);