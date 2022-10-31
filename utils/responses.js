//Standard error response
const errorResponse = (res, msg, error, code = 500) => {
  return res.status(code).json({
    ok: false,
    msg,
    error,
  });
};

module.exports = {
  errorResponse,
};
