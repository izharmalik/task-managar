import {
  validateEmail,
  checkEmptySpaces,
  checkPassword,
} from "../Common/Utils/index.js";

export const validateLogin = ({ email, password }) => {
  const errors = {};
  const emailValidation = validateEmail(email);
  const passwordValidation = checkPassword(password);

  if (emailValidation.error) {
    errors.email = emailValidation.message;
  }

  if (!password) {
    errors.password = "Please Enter Valid Password.";
  } else if (checkEmptySpaces(password)) {
    errors.password = "Password cannot have spaces.";
  } else if (password.length < 8) {
    errors.password = "Password cannot be less then 8.";
  } else if (passwordValidation.error) {
    errors.password = passwordValidation.message;
  }

  return errors;
};
