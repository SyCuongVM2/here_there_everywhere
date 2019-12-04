const Validator = require('validator');
const bcrypt = require('bcryptjs');

const isEmpty = require('../../helpers/is-empty');

module.exports = {
  encryptPassword: async (plainText) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainText, salt);
  },
  comparePassword: async(plainText, encryptedPasswrd) => {
    return await bcrypt.compare(plainText, encryptedPasswrd);
  },
  validateRegister: (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = "Name must be between 2 and 30 characters";
    }
    if (Validator.isEmpty(data.name)) {
      errors.name = "Name is required";
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email is required";
    }
    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
      errors.password = "Password must be at least 6 characters";
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password is required";
    }
    // if (Validator.isEmpty(data.password2)) {
    //   errors.password2 = "Confirm Password is required";
    // }
    // if (!Validator.equals(data.password, data.password2)) {
    //   errors.password2 = "Passwords must match";
    // }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  validateLogin: (data) => {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email is required";
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};