import AsyncStorage from "@react-native-async-storage/async-storage";

const isEmpty = function (value) {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    (value !== null && typeof value === "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

export const setItemToAsync = (student, item) => {
  if (isEmpty(student)) {
    throw Error("Storage Name is empty");
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(student, item, (error) => {
      if (error) {
        reject(error);
      }

      resolve(true);
    });
  });
};

export const getItemFromAsync = (student) => {
  if (isEmpty(student)) {
    throw Error("Storage Name is empty");
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(student, (err, result) => {
      if (err) {
        reject(err);
      }

      if (result === null) {
        resolve(null);
      }

      resolve(result);
    });
  });
};
