import {
  validateEmail,
  checkEmptySpaces,
  checkPassword,
  checkForAlphabets,
} from "../Common/Utils/index.js";

export const validateRegister = ({ username, email, password }) => {
  const errors = {};
  const emailValidation = validateEmail(email);
  const userNameValidation = checkForAlphabets(username);
  const passwordValidation = checkPassword(password);

  if (!username) {
    errors.username = "Please Enter Valid Username.";
  } else if (checkEmptySpaces(username)) {
    errors.username = "Remove empty spaces.";
  } else if (userNameValidation.error) {
    errors.username = userNameValidation.message;
  }

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
