export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!email) return { error: true, message: "Email cannot be empty." };
  else if (!regex.test(email))
    return { error: true, message: "Email is not valid." };
  else return false;
};

export const checkForAlphabets = (alphabets) => {
  const regex = /^[a-zA-Z]+$/;

  if (!regex.test(alphabets))
    return { error: true, message: "Only alphabets allowed." };
  else return false;
};

export const checkForNumbers = (numbers) => {
  const regex = /^-?\d+\.?\d*$/;

  if (numbers === null) {
    return false;
  } else if (!regex.test(numbers))
    return { error: true, message: "Only numbers allowed." };
  else return false;
};

export const checkPassword = (password) => {
  const uppercaseCheck = /(?=.*[A-Z])/;
  const lowercaseCheck = /(?=.*[a-z])/;
  const digitCheck = /(?=.*\d)/;
  const symbolCheck = /.*\W.*/;

  if (!uppercaseCheck.test(password))
    return {
      error: true,
      message: "Password must contain one uppercase letter.",
    };
  else if (!lowercaseCheck.test(password)) {
    return {
      error: true,
      message: "Password must contain one lowercase letter.",
    };
  } else if (!digitCheck.test(password)) {
    return {
      error: true,
      message: "Password must contain one number.",
    };
  } else if (!symbolCheck.test(password)) {
    return {
      error: true,
      message: "Password must contain one special character.",
    };
  } else return false;
};

export const updateState = (state, setState, name) => {
  setState(
    Object.keys(state).forEach((key) => {
      state[key] = false;
    })
  );

  setState({ ...state, [name]: true });
};

export const emptyState = (state, setState) => {
  Object.keys(state).forEach((key) => {
    state[key] = "";
  });
};

export const checkEmptySpaces = (param) => {
  const regex_space = /\s/g;

  if (regex_space.test(param)) return true;
};
