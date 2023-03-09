import {
  validateEmail,
  checkEmptySpaces,
  checkPassword,
  checkForAlphabets,
} from "../Common/Utils/index.js";

export const validateResetPassword = ({ password, confirmPassword }) => {
  const errors = {};
  const passwordValidation = checkPassword(password);

  if (!password) {
    errors.password = "Password cannot be empty.";
  } else if (checkEmptySpaces(password)) {
    errors.password = "Password cannot have spaces.";
  } else if (password.length < 8) {
    errors.password = "Password cannot be less then 8.";
  } else if (passwordValidation.error) {
    errors.password = passwordValidation.message;
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Password cannot be empty";
  } else if (checkEmptySpaces(confirmPassword)) {
    errors.confirmPassword = "Password cannot have spaces.";
  } else if (confirmPassword.length < 6) {
    errors.confirmPassword = "Password cannot be less then 6.";
  } else if (passwordValidation.error) {
    errors.password = passwordValidation.message;
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords are not matching.";
  }

  return errors;
};
