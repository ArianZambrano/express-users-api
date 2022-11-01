const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIRATION_DATE,
      },
      (err, token) => {
        if (err) {
          reject("Couldn't generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const errorFactory = (msg, statusCode) => {
  const error = new Error(msg);
  error.code = statusCode;
  return error;
};

const parseSort = ( sort, order) => {
    if(order == 'desc') {
        sort = "-" + sort;
    }
    return sort;
}

module.exports = {
  encryptPassword,
  generateJWT,
  errorFactory,
  parseSort
};
