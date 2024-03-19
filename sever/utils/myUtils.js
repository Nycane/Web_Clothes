module.exports = {
  arrayIsEmpty(array) {
    if (array.length === 0) {
      return true;
    }
    return false;
  },
  objectIsEmpty(object) {
    if (Object.keys(object).length === 0) {
      return true;
    }
    return false;
  },
};
