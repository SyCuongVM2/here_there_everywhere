const gravatar = require('gravatar');

const userService = require('./user.service');
const User = require('./user.model');
const jwt = require('../../helpers/jwt');

module.exports = {
  // @route  POST api/user/register
  // @desc   Register user
  // @access Public
  register: async (req, res) => {
    try {
      const { errors, isValid } = userService.validateRegister(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { name, email, password } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        errors.email = "Email already exists!";
        return res.status(400).json(errors);
      } else {
        const encryptedPass = await userService.encryptPassword(password);
        const avatar = gravatar.url(req.body.email, {
          s: 200, //size
          r: "pg", //rating
          d: "mm" //default
        }, true);

        user = new User({
          name,
          email,
          avatar,
          password: encryptedPass
        });
        await user.save();

        const payload = {
          id: user.id
        };

        const token = jwt.issue(payload, '1d');
        return res.json({
          success: true,
          token: `Bearer ${token}`
        });
      }
    } catch (err) {
      return res.status(500).send(err);
    } 
  },
  // @route  POST api/user/login
  // @desc   Login user and returning token
  // @access Public
  login: async (req, res) => {
    const { errors, isValid } = userService.validateLogin(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }

    const isMatch = await userService.comparePassword(req.body.password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id
      };

      const token = jwt.issue(payload, '1d');
      return res.json({
        success: true,
        token: `Bearer ${token}`
      });
    } else {
      errors.password = "Password does not match";
      return res.status(400).json(errors);
    }
  },
  // @route  GET api/user/me
  // @desc   return current user
  // @access protected
  me: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};