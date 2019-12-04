const Validator = require('validator');

const isEmpty = require('../../helpers/is-empty');

module.exports = {
  validateCategory: (data) => {
    let errors = {};
    data.en_name = !isEmpty(data.en_name) ? data.en_name : "";
    data.vn_name = !isEmpty(data.vn_name) ? data.vn_name : "";

    if (Validator.isEmpty(data.en_name)) {
      errors.en_name = "Name (in English) is required";
    }
    if (Validator.isEmpty(data.vn_name)) {
      errors.vn_name = "Name (in Vietnamese) is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};