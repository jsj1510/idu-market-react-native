export const validateEmail = (email) => {
  const regex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return regex.test(email);
};

export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, "");
};

export const checkStudent = (student) => {
  const regex = /^[a-zA-Z][a-zA-Z0-9]{5,11}$/;
  return regex.test(student);
};

export const checkName = (name) => {
  const regex = /^[가-힣]{2,6}$/;
  return regex.test(name);
};

export const checkNickname = (nickname) => {
  const regex = /^[a-zA-Z가-힣0-9]{2,10}$/;
  return regex.test(nickname);
};

export const checkPassword = (password) => {
  const regex = /^.*(?=^.{9,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&+=]).*$/;
  return regex.test(password);
};
