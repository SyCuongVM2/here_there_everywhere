const Profile = require('./profile.model');
const User = require('../user/user.model');

module.exports = {
  // @route  GET api/profile
  // @desc   Get current users profile
  // @acsess Private
  current: async(req, res) => {
    try {
      const errors = {};
      const profile = await Profile.findOne({ user: req.user.id })
                                   .populate('user', ['name', 'avatar']);
      if (!profile) {
        errors.noprofile = "There is no profile for this uer";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  GET api/profile/user/:user_id
  // @desc   Get profile by user id
  // @access Public
  getById: async(req, res) => {
    try {
      const errors = {};
      const profile = await Profile.findOne({ user: req.params.user_id })
                                   .populate('user', ['name', 'avatar']);
      if (!profile) {
        errors.noprofile = "There is no profile for this uer";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  POST api/profile
  // @desc   Create or Edit user profile
  // @acsess private
  create: async(req, res) => {
    try {
      const profileFields = {};
      
      profileFields.user = req.user.id;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.bio) profileFields.bio = req.body.bio;

      // Social
      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );

      return res.json(profile);
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  DELETE api/profile
  // @desc   Delete user and profile
  // @access Private
  delete: async(req, res) => {
    try {
      const profile = await Profile.findOneAndRemove({ user: req.user.id });
      if (profile) {
        const user = await User.findOneAndRemove({ _id: req.user.id });
        if (user) {
          return res.json({ success: true });
        }
      }
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};