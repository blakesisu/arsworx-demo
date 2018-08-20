export const validateEmail = string => {
  // Exit early if string is empty
  if (string === '') {
    return null;
  }

  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passed = regex.test(String(string).toLowerCase());

  if (passed) {
    return null;
  }

  return 'Please enter a valid email address';
};
