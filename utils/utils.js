const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validImageExtensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

/**
 * Encrypts a password
 * @param password - Password to encrypt
 */
const encryptPassword = password => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
}

/**
 * Compares a password with an encrypted password
 * @param id - User id
 */
const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRATION_DATE
        }, (err, token) => {
            if (err) {
                reject("Couldn't generate token");
            } else {
                resolve(token);
            }
        });
    });
}

/**
 * Converts a file to base64
 * @param mimetype - Mimetype of the file
 * @param buffer - Buffer of the file
 * @returns 
 */
const fileToBase64 = (mimetype, buffer) => {
    const base64Buffer = Buffer.from(buffer).toString('base64');
    return 'data:' + mimetype + ';base64,' + base64Buffer;
}

/**
 * Parses the sort query
 * @param sort - Sort query
 * @param order - Order query
 */
const parseSort = (sort, order) => {
    if (order == 'desc') {
        sort = "-" + sort;
    }
    return sort;
}

/**
 * Creates an error
 * @param msg - Error message
 * @param statusCode - Error status code
 * @returns 
 */
const errorFactory = (msg, statusCode) => {
    const error = new Error(msg);
    error.code = statusCode;
    return error;
}

/**
 * Validates the image extension
 * @param fileName - File name
 */
const imageExtensionValidator = fileName => {

    let extension = fileName.split('.');
    extension = extension[extension.length - 1];

    if (validImageExtensions.includes(extension)) {
        return true;
    }

}

module.exports = {
    encryptPassword,
    generateJWT,
    fileToBase64,
    errorFactory,
    parseSort,
    imageExtensionValidator
};