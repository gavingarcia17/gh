import jwtDecode from 'jwt-decode';

// Function to check if user is logged in
export const loggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

// Function to get the token from local storage
export const getToken = () => {
  return localStorage.getItem('id_token');
};

// Function to check if the token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

// Function to log in the user
export const login = (idToken) => {
  localStorage.setItem('id_token', idToken);
  window.location.assign('/');
};

// Function to log out the user
export const logout = () => {
  localStorage.removeItem('id_token');
  window.location.assign('/');
};