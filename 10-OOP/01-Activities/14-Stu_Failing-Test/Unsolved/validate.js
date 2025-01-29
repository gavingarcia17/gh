class Validate {
  isPassword(password) {
    if (!password) {
      return false;
    }
    // Add additional password validation logic here if needed
    return true;
  }
}

module.exports = Validate;