const { Router } = require("express");

//PostUser Flow and Validators
const PostUserFlow = require("../apis/users/postUser/flow");
const PostUserValidators = require("../apis/users/postUser/validators");

const router = Router();

router.post("/", PostUserValidators, PostUserFlow);

module.exports = router;
