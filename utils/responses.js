
/**
 * Returns standard error response
 * @param res - Response
 * @param msg - Message to send
 * @param error - Error message
 * @param code - Code (default 500)
 * @returns 
 */
const errorResponse = (res, msg, error, code = 500) => {
  return res.status(code).json({
    ok: false,
    msg,
    error,
  });
};

/**
 * Standard success response, can be personalized with a message
 * @param res - Response
 * @param msg - Message to send
 * @param code - Code (default 200)
 */
const customResponse = (res, msg, code = 200) => {
  return res.status(code).json({
    ok: true,
    msg,
  });
};

/**
 * Standard error response, can be personalized with a message
 * @param res - Response
 * @param msg - Message to send
 * @param code - Code (default 200)
 * @returns 
 */
const customErrorResponse = (res, msg, code = 400) => {
  return res.status(code).json({
    ok: false,
    msg,
  });
};

module.exports = {
  errorResponse,
  customResponse,
  customErrorResponse,
};
