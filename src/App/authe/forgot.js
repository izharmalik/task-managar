import { validateEmail } from "../Common/Utils/index";

export const validateForgot = ({ email }) => {
  const errors = {};
  const emailValidation = validateEmail(email);

  if (emailValidation.error) {
    errors.email = emailValidation.message;
  }

  return errors;
};
