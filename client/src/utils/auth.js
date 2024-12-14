import Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';

class Auth {
  // Store the token in cookies
  static login(token) {
    Cookies.set('id_token', token, { expires: 7 }); // Set the token with an expiration of 7 days
  }

  // Retrieve the token from cookies
  static getToken() {
    // Retrieve the token from cookies using js-cookie
    const token = Cookies.get('id_token');
    console.log('Retrieved token:', token);
    return token;
  }

  // Remove the token from cookies
  static logout() {
    Cookies.remove('id_token');
  }

  // Check if the user is logged in
  static loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  static isTokenExpired(token) {
    try {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Failed to decode token', err);
      return false;
    }
  }
}

export default Auth;