const { Router } = require("express");

//PostUser Flow and Validators
const PostUserFlow = require("../apis/users/postUser/flow");
const PostUserValidators = require("../apis/users/postUser/validators");

//Login Flow and Validators
const LoginUserFlow = require("../apis/users/loginUser/flow");
const LoginUserValidators = require("../apis/users/loginUser/validators");

//GetUser Flow and Validators
const GetUserFlow = require('../apis/users/getUser/flow');
const GetUserValidators = require('../apis/users/getUser/validators');

const router = Router();

router.post("/", PostUserValidators, PostUserFlow);
router.post("/login", LoginUserValidators, LoginUserFlow);

router.put('/follow', FollowUserValidators, FollowUserFlow);
router.put('/unfollow', UnfollowUserValidators, UnfollowUserFlow);

module.exports = router;
