export const writeToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(error);
  }
};

export const getFromLocalStorage = (key, value) => {
  try {
    localStorage.getItem(key);
  } catch (error) {
    console.warn(error);
  }
};
